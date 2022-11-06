import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import styled from 'styled-components';
import Button from '../common/Button';
import Link from 'next/link';
import SearchArea from './SearchArea';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';

function Header() {
  const [user, setUser] = useAtom(userAtom);
  console.log('header', user);

  const removeToken = () => {
    localStorage.removeItem('accessToken');
    setUser('');
  };

  return (
    <Block>
      <Content>
        <Addon></Addon>
        <Addon>
          {/* <SearchArea /> */}
          <Buttons>
            {user && (
              <>
                <Link href="notification">
                  <Button styleType="secondary" size="small">
                    알림
                  </Button>
                </Link>
                <Link href="hosting">
                  <Button styleType="tertiary" size="small">
                    내경매
                  </Button>
                </Link>
                <Link href="add">
                  <Button styleType="tertiary" size="small">
                    경매생성
                  </Button>
                </Link>
              </>
            )}
            <Link href="chart">
              <Button styleType="tertiary" size="small">
                시세
              </Button>
            </Link>
            {!user ? (
              <>
                <Link href="login">
                  <Button styleType="primary" size="small">
                    로그인
                  </Button>
                </Link>
                <Link href="register">
                  <Button styleType="primary" size="small">
                    회원가입
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="register">
                  <Button styleType="primary" size="small">
                    내정보
                  </Button>
                </Link>
                <Button styleType="primary" size="small" onClick={removeToken}>
                  로그아웃
                </Button>
              </>
            )}
          </Buttons>
        </Addon>
      </Content>
    </Block>
  );
}

const Block = styled.div`
  background: ${colors.gray1};
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
