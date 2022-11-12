import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import styled from 'styled-components';
import Link from 'next/link';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { getStroageItem, removeStorageItem } from '@/lib/local-storage';
import { useEffect } from 'react';
import { checkIsLoggedIn } from '@/lib/protectedRotue';

function TopHeader() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const removeToken = () => {
    removeStorageItem('accessToken');
    setUser(null);
    router.replace('/');
  };

  return (
    <Block>
      <Content>
        <Addon>
          <Link href={'/'}>
            <LogoTitle>EMETAL</LogoTitle>
          </Link>
        </Addon>
        <Addon>
          {/* <SearchArea /> */}
          <Buttons>
            {!user ? (
              <>
                <Link href="login">로그인</Link>
                <Link href="register">회원가입</Link>
              </>
            ) : (
              <>
                <span>{user?.personal?.name}님 환영합니다.</span>
                <span onClick={removeToken}>로그아웃</span>
              </>
            )}
          </Buttons>
        </Addon>
      </Content>
    </Block>
  );
}

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding: 0;
  line-height: 14px;
  cursor: pointer;
  svg {
    margin-bottom: 4px;
    color: ${colors.gray9};
  }
  span {
    display: flex;
    justify-content: center;
    width: 48px;
    color: ${colors.gray9};
    font-size: 12px;
    margin: 0;
  }
`;

const Block = styled.div`
  background: ${colors.gray1};
  position: relative;
  height: 40px;
  border-bottom: 0.5px solid ${colors.gray3};
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
  align-items: center;
  gap: 8px;
`;

const LogoTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  cursor: pointer;
`;

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`;

export default TopHeader;
