import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteMyAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { AuctionType } from '@/lib/api/types';
import { useEffect, useState } from 'react';
import { colors } from '@/lib/colors';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { useRouter } from 'next/router';
import { useOpenDialog } from '@/hooks/useDialog';

const Home: NextPage = () => {
  const [selectedAuctionType, setSelectedAuctionType] = useState<AuctionType>('hosting');
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const userResult = await checkIsLoggedIn({ redirectTo: '/' });
    if (userResult) {
      setUser(userResult);
      return;
    }
  };

  const {
    data: auctions,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteMyAuctions(selectedAuctionType, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.pageable.pageNumber + 1;
      }
    },
    enabled: !!user,
  });

  // const me = async () => {
  //   const result = await getProfile();
  //   if (result) {
  //     setUser(result);
  //   } else {
  //     router.replace('/login');
  //   }
  // };

  // useEffect(() => {
  //   me();
  // }, []);

  const selectMenu = (selectedMenu) => {
    setSelectedAuctionType(selectedMenu);
  };

  if (isLoading || !user) return;

  return (
    <StyledTabTamplete>
      <Content>
        <SubMenuLayout>
          <StyledMenu
            selected={selectedAuctionType === 'hosting'}
            onClick={() => selectMenu('hosting')}
          >
            나의(경매/역경매)
          </StyledMenu>
          <StyledMenu
            selected={selectedAuctionType === 'bidding'}
            onClick={() => selectMenu('bidding')}
          >
            참가(경매/역경매)
          </StyledMenu>
        </SubMenuLayout>
        <AuctionCardList auctions={auctions} forbidden></AuctionCardList>
        {hasNextPage && (
          <ButtonWrapper>
            <Button size="medium" onClick={fetchNextPage}>
              더보기
            </Button>
          </ButtonWrapper>
        )}
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

const SubMenuLayout = styled.div`
  display: flex;
  gap: 16px;
  padding: 10px 0;
  font-size: 16px;
`;

const StyledMenu = styled.h3<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? `${colors.primary}` : `${colors.gray5}`)};
  &:hover {
    cursor: pointer;
  }
`;

export default Home;
