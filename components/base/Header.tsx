import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import styled from 'styled-components';
import Button from '../common/Button';
import Link from 'next/link';
import SearchArea from './SearchArea';

function Header() {
  return (
    <Block>
      <Content>
        <Addon></Addon>
        <Addon>
          <SearchArea />
          <Buttons>
            <Button styleType="primary" size="small">
              로그인
            </Button>
            <Button styleType="primary" size="small">
              회원가입
            </Button>
          </Buttons>
        </Addon>
      </Content>
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.gray3};
  padding: 0 16px;
  display: none;
  align-items: center;
  ${media.mobile} {
    display: flex;
  }
`;

// const StyledLogo = styled(Logo)`
//   height: 32px;
//   width: auto;
// `;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Addon = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`;

export default Header;
