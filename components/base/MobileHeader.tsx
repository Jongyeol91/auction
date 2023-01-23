import React, {useEffect} from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import { useRouter } from 'next/router';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import {checkIsLoggedIn} from "@/lib/protectedRotue";
import {removeStorageItem} from "@/lib/local-storage";

// Todo: svg 컴포넌트 로고로 바꿀 경우 React.ReactNode 로 타입 바꾸기
interface Props {
  title?: string;
  headerLeft?: React.ReactNode;
  loginHeaderRight?: React.ReactNode;
  loginOutHeaderRight?: React.ReactNode;
  registerHeaderRight?: React.ReactNode;
}

function MobileHeader({ title = 'EMETAL', headerLeft, loginHeaderRight, loginOutHeaderRight, registerHeaderRight }: Props) {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const removeToken = () => {
    removeStorageItem('accessToken');
    setUser(null);
    router.replace('/');
  };

  const login = () => {
    return (
        <SecondHeaderSide position="right">{loginHeaderRight}</SecondHeaderSide>
    );
  };

  const logout = () => {
    return (
        <span>
          <FirstHeaderSide position="right" onClick={removeToken}>{loginOutHeaderRight}</FirstHeaderSide>
          <SecondHeaderSide position="right">{registerHeaderRight}</SecondHeaderSide>
        </span>
    );
  };

  return (
    <Block>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {!user ? login() : logout()}
    </Block>
  );
}

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position} : 16px;
  display: flex;
  align-items: center;
  right: 16px;
  top: 0;
  height: 100%;
`;

const FirstHeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position} : 16px;
  display: flex;
  align-items: center;
  right: 48px;
  top: 0;
  height: 100%;
`;

const SecondHeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position} : 16px;
  display: flex;
  align-items: center;
  right: 16px;
  top: 0;
  height: 100%;
`;

const Block = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.gray3};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    display: none;
  }
`;

const Title = styled.div`
  color: ${colors.gray7};
  font-weight: 600;
`;

export default MobileHeader;
