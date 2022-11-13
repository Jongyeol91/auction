import { colors } from '@/lib/colors';
import styled from 'styled-components';

function GlobalFooter() {
  return (
    <Container>
      <Wrapper>
        <FirstRow>
          <FirstRowColumn1Title>
            <p>Everyday with you (슬로건)</p>
            <p>EMETAL</p>
          </FirstRowColumn1Title>
          <div>
            {/* <p>test</p>
            <p>test</p> */}
          </div>
        </FirstRow>
        <SecondRowColumn1></SecondRowColumn1>
        <ConpanyInfo>
          <p>
            TrillionsLab Co., Ltd. | CEO: Thomas Kang | 개인정보책임관리자: 홍길동 | 사업자번호:
            352-87-01712
          </p>
          <p>
            통신판매업번호: 제 2017-서울강남-00000호 | 주소: 3F, Worldcup Buk-ro 6 Gil 82, Mapo-gu,
            Seoul, South Korea
          </p>
          <p>
            <>
              고객센터:
              <a href={`mailto:www.naver.com`}>CEO@trillionslab.com </a> | 마케팅:
              <a href={`mailto:www.naver.com`}>CEO@trillionslab.com</a>
            </>
          </p>
          <p>대표번호: 010 - xxxx - xxx | 운영시간: 오전 9시 ~ 오후 6시</p>
          <p>COPYRIGHT © 2022 TrillionsLab Co., Ltd. ALL RIGHTS RESERVED.</p>
        </ConpanyInfo>
      </Wrapper>
    </Container>
  );
}

export default GlobalFooter;

const Container = styled.div`
  margin-top: 100px;
  background-color: ${colors.footerBG};
  width: 100%;
  padding-top: 80px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  @media (max-width: 1200px) {
    padding: 0px 80px;
  }

  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const FirstRowColumn1Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: -0.3px;
  color: ${colors.gray9};
  margin-bottom: 20px;

  & > p {
    color: ${colors.gray9} !important;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const SecondRowColumn1 = styled.div`
  display: flex;

  justify-content: space-between;

  border-bottom: 1px solid ${colors.gray5};

  margin-bottom: 29.5px;
  padding-bottom: 29.5px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ConpanyInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: ${colors.gray9};
  margin: ${({ margin }) => margin || '0'};

  & > p {
    color: ${colors.gray6} !important;
    margin: 0;
    padding: 0;
    &:last-child {
      margin-top: 10px;
    }
  }

  & a {
    color: ${colors.gray6} !important;
    margin: 0px 3px;
    &:hover {
      color: ${colors.gray9} !important;
    }
  }
`;
