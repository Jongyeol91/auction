import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfinitePosts, useGetAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import MainChart from '@/components/charts/MainChart';

const Home: NextPage = () => {
  const { data: auctions, isLoading, fetchNextPage } = useFetchInfinitePosts();
  console.log(auctions);

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <MainChart />
        <AuctionCardList auctions={auctions}></AuctionCardList>
        <ButtonWrapper>
          <Button size="medium" onClick={fetchNextPage}>
            더보기
          </Button>
        </ButtonWrapper>
      </Content>
    </StyledTabTamplete>
  );
};

// export async function getServerSideProps() {
//   const auctions = await getAuctions();
//   console.log(auctions);

//   return { props: { auctions } };
//}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTabTamplete = styled(TabTamplete)`
  padding: 16px 16px;
`;

const Content = styled.div`
  ${media.wide} {
    width: 1200px;
    min-height: 100px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default Home;
