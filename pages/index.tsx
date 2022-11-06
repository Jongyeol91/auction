import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { MainChart } from '@/components/charts/MainChart';
import { getPriceIndexCategory } from '@/lib/api/price-index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Home: NextPage = () => {
  const [categoryId, setCategoryId] = useState<number>(1);

  const { data: auctions, isLoading, fetchNextPage } = useFetchInfiniteAuctions();

  const { data: priceIndexData } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: ({ queryKey }) => getPriceIndexCategory(queryKey[1]),
  });

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <ChartWrapper>
          <ChartInnerWrapper>
            <MainChart priceIndexData={priceIndexData} />
          </ChartInnerWrapper>
          <ChartButtonWrapper>
            <Button onClick={() => setCategoryId(1)} layoutMode="fullWidth">
              금속종류1
            </Button>
            <Button onClick={() => setCategoryId(2)} layoutMode="fullWidth">
              금속종류2
            </Button>
          </ChartButtonWrapper>
        </ChartWrapper>
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

const ChartWrapper = styled.div`
  display: flex;
  height: 400px;
  justify-content: space-between;
`;

const ChartInnerWrapper = styled.div`
  width: 100%;
`;

const ChartButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  gap: 2px;
  flex-direction: column;
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
