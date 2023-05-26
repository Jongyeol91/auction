import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteAuctions, useMetals } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { colors } from '@/lib/colors';
import { FILTER_TYPE_OPTION, NORMAL, REVERSE } from '@/lib/constants';
import { AuctionType } from '@/lib/api/types';
import ChartCarousel from '@/components/charts/ChartCarousel';
import LabelSelect from '@/components/common/LabelSelect';
import EmptyPage from '@/components/common/Empty';

const Home: NextPage = () => {
  const [selectedAuctionType, setSelectedAuctionType] = useState<AuctionType>(null);
  const [sort, setSort] = useState('createdAt,desc');
  const [metalId, setMetalId] = useState('');

  const onSelectSort = (sort: string) => {
    setSort(sort);
  };

  const onSelectMetalId = (metalId: number) => {
    setMetalId(metalId);
  };

  const { data: metalData, isLoading: isLoadingMetals } = useMetals();

  const {
    data: auctions,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchInfiniteAuctions(selectedAuctionType, sort, metalId);

  const selectMenu = (selectedMenu: AuctionType) => {
    setSelectedAuctionType(selectedMenu);
  };

  const renderMetalLabel = () => {
    return metalData?.map((metal) => {
      return { label: metal.name, value: metal.id };
    });
  };

  if (isLoading) return;

  return (
    <StyledTabTamplete hasLoginButton>
      <Content>
        <SubMenuLayout>
          <StyledMenu selected>시세</StyledMenu>
        </SubMenuLayout>
        <ChartCarousel />
        <AuctionMenuWrapper>
          <SubMenuLayout>
            <StyledMenu selected={!selectedAuctionType} onClick={() => selectMenu(null)}>
              전체경매
            </StyledMenu>
            <StyledMenu
              selected={selectedAuctionType === NORMAL}
              onClick={() => selectMenu(NORMAL)}
            >
              경매
            </StyledMenu>
            <StyledMenu
              selected={selectedAuctionType === REVERSE}
              onClick={() => selectMenu(REVERSE)}
            >
              역경매
            </StyledMenu>
          </SubMenuLayout>

          <FilterWrapper>
            <LabelSelect options={FILTER_TYPE_OPTION} onChange={onSelectSort} defaultValue={sort} />
            <LabelSelect
              options={[{ label: '금속전체', value: '' }, ...renderMetalLabel()]}
              onChange={onSelectMetalId}
              defaultValue={metalId}
            />
          </FilterWrapper>
        </AuctionMenuWrapper>
        {auctions?.pages[0].totalElements > 0 ? (
          <AuctionCardList auctions={auctions}></AuctionCardList>
        ) : (
          <EmptyPage description="조건에 부합하는 경매가 없습니다." />
        )}
        <ButtonWrapper>
          {hasNextPage && (
            <Button styleType="primary" size="medium" onClick={fetchNextPage}>
              더보기
            </Button>
          )}
        </ButtonWrapper>
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

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${media.tablet} {
    margin-bottom: 0;
    padding: 10px 0;
    gap: 4px;
    flex-direction: row;
  }
`;

const SubMenuLayout = styled.div`
  display: flex;
  gap: 16px;
  padding: 10px 0;
  font-size: 16px;
`;

const AuctionMenuWrapper = styled.div`
  ${media.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledMenu = styled.h3<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? `${colors.primary}` : `${colors.gray5}`)};
  &:hover {
    cursor: pointer;
  }
`;

export default Home;
