import type { NextPage } from 'next';
import styled from 'styled-components';
import { useFetchInfiniteAuctions } from '@/hooks/auctions';
import TabTamplete from '@/components/templates/TabTemplate';
import AuctionCardList from '@/components/home/AuctionCardList';
import { media } from '@/lib/media';
import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import { colors } from '@/lib/colors';
import { NORMAL, REVERSE } from '@/lib/constants';
import { AuctionType } from '@/lib/api/types';
import { useAtom } from 'jotai';
import { firstAuctionFormAtom } from './add';
import { Card, Carousel } from 'antd';
import { userAtom } from '@/store';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

const Home: NextPage = () => {
  const [selectedAuctionType, setSelectedAuctionType] = useState<AuctionType>(null);
  const [, setFirstAuctionFormData] = useAtom(firstAuctionFormAtom);
  // const [user] = useAtom(userAtom);

  useEffect(() => {
    setFirstAuctionFormData(null);
  }, []);

  const {
    data: auctions,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchInfiniteAuctions(selectedAuctionType);

  // const { data: priceIndexCategoryAllData } = useQuery(
  //   {
  //     queryKey: ['categoryAll'],
  //     queryFn: () => getPriceIndexCategoryAll(),
  //   },
  //   { enabled: !!user },
  // );

  // const { data: priceIndexData } = useQuery({
  //   queryKey: ['category', 1],
  //   queryFn: ({ queryKey }) => getPriceIndexCategory(queryKey[1]),
  // });

  const selectMenu = (selectedMenu: AuctionType) => {
    setSelectedAuctionType(selectedMenu);
  };

  if (isLoading) return;

  return (
    <StyledTabTamplete>
      <Content>
        <SubMenuLayout>
          <StyledMenu selected={!selectedAuctionType}>시세</StyledMenu>
        </SubMenuLayout>
        <StyledCarousel autoplay>
          <div>
            <Card>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>구리</span>
                  <span>500만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>알루미늄</span>
                  <span>1000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>금</span>
                  <span>1000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>은</span> <span>2000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
            </Card>
          </div>
          <div>
            <Card>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>철</span> <span>3000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>텅스텐</span> <span>1000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>합성 금속</span> <span>100만원</span>
                </ChartTextWrapper>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <ChartTextWrapper>
                  <span>희토류</span> <span>9000만원</span>
                </ChartTextWrapper>
              </Card.Grid>
            </Card>
          </div>
        </StyledCarousel>
        <SubMenuLayout>
          <StyledMenu selected={!selectedAuctionType} onClick={() => selectMenu(null)}>
            전체경매
          </StyledMenu>
          <StyledMenu selected={selectedAuctionType === NORMAL} onClick={() => selectMenu(NORMAL)}>
            경매
          </StyledMenu>
          <StyledMenu
            selected={selectedAuctionType === REVERSE}
            onClick={() => selectMenu(REVERSE)}
          >
            역경매
          </StyledMenu>
        </SubMenuLayout>
        <AuctionCardList auctions={auctions}></AuctionCardList>
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

const ChartTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: 700;
    }
    font-weight: 700;
    color: ${colors.gray7};
  }
`;

const StyledCarousel = styled(Carousel)`
  margin-bottom: 40px;
`;

export default Home;
