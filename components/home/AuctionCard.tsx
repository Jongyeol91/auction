import { type AuctionItem } from '@/lib/api/types';
import styled from 'styled-components';

interface Props {
  auctionImageUrl: string;
  auctionItem: AuctionItem;
}

function AuctionCard({ auctionItem, auctionImageUrl }: Props) {
  const { metalName } = auctionItem;

  return (
    <Block>{auctionImageUrl ? <Thumbnail src={auctionImageUrl} alt={metalName} /> : null}</Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 288/192;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
  display: block; // lineheight 때문에 불필요한 여백 방지
  margin-bottom: 8px;
`;

export default AuctionCard;
