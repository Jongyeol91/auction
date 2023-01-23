import TabTamplete from '@/components/templates/TabTemplate';
import {useFetchInfiniteNotifications, useGetNotification} from '@/hooks/notification';
import { media } from '@/lib/media';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { userAtom } from '@/store';

import { Tag, Collapse } from 'antd';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Notification } from '@/lib/api/types';
import AuctionCard from '@/components/home/AuctionCard';
import { useRouter } from 'next/router';
import { useOpenDialog } from '@/hooks/useDialog';
import EmptyPage from '@/components/common/Empty';
import Button from "@/components/common/Button";

const { Panel } = Collapse;

const notificationTypeColorMap = {
  BID_WON: 'blue', // 입찰낙찰
  BID_FAIL: 'orange', // 낙찰실패
  MISCARRIED: 'red', // 유찰
  ACTIONED_OFF: 'pink', // 경매낙찰
  ADMIN_NOTICE: 'brown', // 관리자공지
};

const notificationTypeTextMap = {
  BID_WON: '입찰낙찰',
  BID_FAIL: '낙찰실패',
  MISCARRIED: '유찰',
  ACTIONED_OFF: '경매낙찰',
  ADMIN_NOTICE: '관리자공지',
};

function Notification() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { openDialog } = useOpenDialog();

  const {
    data: notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteNotifications({
    getNextPageParam: (lastPage) => {
      if (!lastPage?.last) {
        return lastPage?.pageable.pageNumber + 1;
      }
    },
    enabled: !!user,
  });

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    if (user) {
      setUser(user);
    } else {
      openDialog({
        title: '알림',
        description: '로그인 이후 이용해주세요',
        mode: 'YESNO',
        confirmText: '로그인 하기',
        onConfirm: () => router.replace('/login'),
        onClose: () => router.replace('/'),
      });
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const notificationItem = (notification: Notification) => {
    const color = notificationTypeColorMap[notification.notificationType];
    const text = notificationTypeTextMap[notification.notificationType];
    return (
      <NotificationWapper>
        <Wrapper>
          <Tag color={color}> {text}</Tag>
          {notification.content}
        </Wrapper>
        {notification.createdAt}
      </NotificationWapper>
    );
  };

  const notificationList = (pages) => {
    return pages?.map((page) => {
      return page?.content.map((notification: Notification) => {
        return (
            <StyledPanel header={notificationItem(notification)} key={notification.id}>
              <CardWrapper>
                <AuctionCard auctionContent={notification?.auction} />
              </CardWrapper>
            </StyledPanel>
        );
      });
    });
  };

  if (isLoading || !user) return;

  const firstElementsNum = notifications?.pages[0].totalElements;

  return (
    <StyledTabTamplete hasBackButton>
      <Content>
        <h2>알림</h2>
        <Collapse>
          {firstElementsNum > 0 ? (
              notificationList(notifications?.pages)
          ) : (
              <EmptyPage description="알림이 아직 없습니다." />
          )}
        </Collapse>
        {hasNextPage && (
            <ButtonWrapper>
              <Button size="medium" onClick={fetchNextPage}>
                더보기
              </Button>
            </ButtonWrapper>
        )}
      </Content>
    </StyledTabTamplete>
  );
}

const Content = styled.div`
  ${media.wide} {
    width: 900px;
    min-height: 100px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const NotificationWapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div``;

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;

const CardWrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export default Notification;
