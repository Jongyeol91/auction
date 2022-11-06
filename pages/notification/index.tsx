import BasicTemplete from '@/components/templates/BasicTemplate';
import TabTamplete from '@/components/templates/TabTemplate';
import { useGetNotification } from '@/hooks/notification';
import { AUCTION_TYPE } from '@/lib/constants';

import { List } from 'antd';
import styled from 'styled-components';

const dummyData = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function Notification() {
  const { data } = useGetNotification();
  console.log(data);

  return (
    <StyledTabTamplete>
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
    </StyledTabTamplete>
  );
}

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;
export default Notification;
