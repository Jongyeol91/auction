import { AuctionContent, type Auctions } from '@/lib/api/types';
import { media } from '@/lib/media';
import styled from 'styled-components';
import AuctionCard from './AuctionCard';

interface Props {
  auctions: Auctions;
  forbidden: boolean;
}

function AuctionCardList({ auctions, forbidden }: Props) {
  return (
    <List>
      {auctions?.pages?.map((page) =>
        page.content?.map((auctionContent: AuctionContent) => (
          <AuctionCard
            key={auctionContent.id}
            auctionContent={auctionContent}
            forbidden={forbidden}
          />
        )),
      )}
    </List>
  );
}

const List = styled.div`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.wide} {
    grid-template-columns: repeat(4, 1fr);
    margin-left: auto;
    margin-right: auto;
  }
  gap: 24px;
`;

export default AuctionCardList;
