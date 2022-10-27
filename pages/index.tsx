import type { NextPage } from 'next';
import styled from 'styled-components';
import { useGetAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';

const Home: NextPage = () => {
  const { data: auctions, isLoading } = useGetAuctions();

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <AuctionCardList auctions={auctions}></AuctionCardList>
    </StyledTabTamplete>
  );
};

// export async function getServerSideProps() {
//   const auctions = await getAuctions();
//   console.log(auctions);

//   return { props: { auctions } };
//}

const StyledTabTamplete = styled(TabTamplete)`
  border: 1px solid red;
  padding: 16px 16px;
`;

export default Home;
