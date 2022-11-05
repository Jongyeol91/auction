import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { usePriceIndexCategory } from '@/hooks/price-index';

const Home: NextPage = () => {
  const { data: auctions, isLoading, fetchNextPage } = useFetchInfiniteAuctions();
  const { data } = usePriceIndexCategory();
  console.log(data);

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <AuctionCardList auctions={auctions}></AuctionCardList>
        <ButtonWrapper>
          <Button styleType="secondary" size="medium" onClick={fetchNextPage}>
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
