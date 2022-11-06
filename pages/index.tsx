import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { MainChart } from '@/components/charts/MainChart';
import { getPriceIndexCategory, getPriceIndexCategoryAll } from '@/lib/api/price-index';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/api/auth';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';

const Home: NextPage = () => {
  // const { data: userData } = useQuery({
  //   queryKey: ['getProfile'],
  //   queryFn: getProfile,
  // });

  const [user, setUser] = useAtom(userAtom);
  // setUser(userData);

  const { data: auctions, isLoading, fetchNextPage } = useFetchInfiniteAuctions();

  const handleGetProfile = async () => {
    const user = await getProfile();
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      handleGetProfile();
    }
  }, []);

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <AuctionCardList auctions={auctions}></AuctionCardList>
        <ButtonWrapper>
          <Button styleType="primary" size="medium" onClick={fetchNextPage}>
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
