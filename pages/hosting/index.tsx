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
import EmptyPage from '@/components/common/Empty';

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

  const selectMenu = (selectedMenu) => {
    setSelectedAuctionType(selectedMenu);
  };

  if (isLoading || !user) return;

  const firstElementsNum = auctions?.pages[0].totalElements;

  return (
    <StyledTabTamplete hasBackButton hasLoginButton>
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
        {firstElementsNum > 0 ? (
          <AuctionCardList auctions={auctions} forbidden></AuctionCardList>
        ) : (
          <EmptyPage description="개설하거나 참가한 경매가 없습니다" />
        )}
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
