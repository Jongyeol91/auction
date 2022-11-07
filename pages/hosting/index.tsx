import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteMyAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { AuctionType } from '@/lib/api/types';
import { useState } from 'react';
import { NORMAL, REVERSE } from '@/lib/constants';
import { colors } from '@/lib/colors';

const Home: NextPage = () => {
  const [selectedAuctionType, setSelectedAuctionType] = useState<AuctionType>('hosting');
  const {
    data: auctions,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteMyAuctions(selectedAuctionType);

  const selectMenu = (selectedMenu) => {
    console.log(selectedMenu);

    setSelectedAuctionType(selectedMenu);
  };

  if (isLoading) return;

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
        <AuctionCardList auctions={auctions}></AuctionCardList>
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
