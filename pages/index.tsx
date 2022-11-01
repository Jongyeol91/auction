import type { NextPage } from 'next';
import styled from 'styled-components';
import { useGetAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';

const Home: NextPage = () => {
  const { data: auctions, isLoading } = useGetAuctions();

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <AuctionCardList auctions={auctions}></AuctionCardList>
      </Content>
    </StyledTabTamplete>
  );
};

// export async function getServerSideProps() {
//   const auctions = await getAuctions();
//   console.log(auctions);

//   return { props: { auctions } };
//}

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;

const Content = styled.div`
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default Home;
