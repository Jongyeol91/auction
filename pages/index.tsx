import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '@/components/base/Footer';
import FullHeightPage from '@/components/common/FullHeightPage';
import Header from '@/components/base/Header';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';

const Home: NextPage = () => {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <Header title="eMetal" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <Main>
        <h1>
          Welcome to <a href="https://emetalexchange.firebaseapp.com/">eMetal</a>
        </h1>
      </Main>
      <Footer></Footer>
    </FullHeightPage>
  );
};

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
