import TabTamplete from '@/components/templates/TabTemplate';
import { useGetNotification } from '@/hooks/notification';
import { media } from '@/lib/media';

import { List, Tag } from 'antd';
import styled from 'styled-components';

type NotificationType = keyof typeof notificationTypeColorMap;

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
  const { data } = useGetNotification();

  const notificationItem = (notificationType: NotificationType) => {
    const color = notificationTypeColorMap[notificationType];
    const text = notificationTypeTextMap[notificationType];
    return <Tag color={color}> {text}</Tag>;
  };

  return (
    <StyledTabTamplete>
      <Content>
        <List
          itemLayout="horizontal"
          dataSource={data?.content}
          renderItem={(item: {
            notificationType: NotificationType;
            content: string;
            createdAt: string;
          }) => (
            <List.Item>
              {notificationItem(item?.notificationType)}
              <List.Item.Meta title={<a>{item?.content}</a>} />
              <h5>{item?.createdAt}</h5>
            </List.Item>
          )}
        />
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

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;

export default Notification;
