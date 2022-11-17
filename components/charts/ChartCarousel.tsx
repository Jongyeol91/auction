import useCheckMobile from '@/hooks/useCheckMobile';
import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import { Card, Carousel } from 'antd';
import styled from 'styled-components';

function ChartCarousel() {
  const isMobile = useCheckMobile();

  const gridStyle: React.CSSProperties = {
    width: isMobile ? '50%' : '25%',
    textAlign: 'center',
  };

  return (
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
