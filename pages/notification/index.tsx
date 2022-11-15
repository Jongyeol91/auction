import TabTamplete from '@/components/templates/TabTemplate';
import { useGetNotification } from '@/hooks/notification';
import { media } from '@/lib/media';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { userAtom } from '@/store';

import { Tag, Collapse } from 'antd';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Notification } from '@/lib/api/types';
import AuctionCard from '@/components/home/AuctionCard';

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

  const { data, isLoading } = useGetNotification({ enabled: !!user });

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const userResult = await checkIsLoggedIn({ redirectTo: '/' });
    if (userResult) {
      setUser(userResult);
      return;
    }
  };

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

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <h2>알림</h2>
        <Collapse defaultActiveKey={['1']}>
          {data?.notificationResponses.content.map((notification: Notification, idx: number) => {
            return (
              <Panel header={notificationItem(notification)} key={idx}>
                <AuctionCard auctionContent={notification.auctionResponse} />
              </Panel>
            );
          })}
        </Collapse>
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

export default Notification;
