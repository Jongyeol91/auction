import useCheckMobile from '@/hooks/useCheckMobile';
import { getPriceIndexCategoryAll } from '@/lib/api/price-index';
import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import { useQuery } from '@tanstack/react-query';
import { Card, Carousel } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function ChartCarousel() {
  const isMobile = useCheckMobile();
  const router = useRouter();

  const { data: priceIndexCategoryAllData, isLoading } = useQuery({
    queryKey: ['categoryAll'],
    queryFn: () => getPriceIndexCategoryAll(),
  });

  if (isLoading) return;

  const totalNum = priceIndexCategoryAllData?.length;
  const loopNum = Math.ceil(totalNum / 4);

  const gridStyle: React.CSSProperties = {
    width: isMobile ? '50%' : '25%',
    textAlign: 'center',
  };

  const onClickCard = (id) => {
    router.push('/chart?id=' + id);
  };

  return (
    <StyledCarousel autoplay>
      {[...Array(loopNum)].map((e, i) => {
        let lastNum = (i + 1) * 4;
        let startNum = i * 4;
        return (
          <Card key={i}>
            {priceIndexCategoryAllData.slice(startNum, lastNum).map((indexData, idx) => (
              <Card.Grid key={idx} style={gridStyle} onClick={() => onClickCard(indexData.id)}>
                <ChartTextWrapper>
                  <span>{indexData.name}</span>
                  <span>{indexData.displayValue}</span>
                </ChartTextWrapper>
              </Card.Grid>
            ))}
          </Card>
        );
      })}
    </StyledCarousel>
  );
}
const ChartTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    font-weight: 700;
    color: ${colors.gray7};

    ${media.mobile} {
      &:nth-child(1) {
        font-size: 15px;
      }
      font-weight: 700;
      font-size: 15px;
    }
  }
`;

const StyledCardGrid = styled(Card.Grid)``;

const StyledCarousel = styled(Carousel)`
  margin-bottom: 40px;
`;

export default ChartCarousel;
