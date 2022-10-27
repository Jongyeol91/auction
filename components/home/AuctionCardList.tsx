import { type Auctions } from '@/lib/api/types';
import styled from 'styled-components';
import AuctionCard from './AuctionCard';

interface Props {
  auctions: Auctions;
}

function AuctionCardList({ auctions }: Props) {
  console.log(auctions.content);

  return (
    <List>
      {auctions?.content?.map((auctionContent) => (
        <AuctionCard
          key={auctionContent.id}
          auctionImageUrl={auctionContent.auctionImageUrl}
          auctionItem={auctionContent.auctionItem}
        />
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AuctionCardList;
