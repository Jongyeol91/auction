import TabTamplete from '@/components/templates/TabTemplate';
import { useGetNotification } from '@/hooks/notification';
import { media } from '@/lib/media';

import { List } from 'antd';
import styled from 'styled-components';

function Notification() {
  const { data } = useGetNotification();

  return (
    <StyledTabTamplete>
      <Content>
        <List
          itemLayout="horizontal"
          dataSource={data?.content}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a>{item?.content}</a>}
                // description={
                //   AUCTION_TYPE[item?.auction?.auctionType] +
                //   ' ' +
                //   item?.auction?.auctionItem?.amount +
                //   '개 ' +
                //   item?.auction?.hostUser?.account.accountHolder
                // }
              />
            </List.Item>
          )}
        />
      </Content>
    </StyledTabTamplete>
  );
}

const Content = styled.div`
  ${media.wide} {
    width: 1200px;
    min-height: 100px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;

export default Notification;
