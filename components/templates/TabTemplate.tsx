import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import Footer from '../base/MobileBottomNavigation';
import Header from '../base/Header';
import TopHeader from '../base/TopHeader';
import { media } from '@/lib/media';
import AutoHeightPage from '../common/AutoHeightPage';
import GlobalFooter from '../base/GlobalFooter';
import useCheckMobile from '@/hooks/useCheckMobile';
import HeaderBackButton from '../base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode | string;
  hasBackButton?: boolean;
  hasLoginButton?: boolean;
}

function TabTamplete({ header, children, className, hasBackButton, hasLoginButton }: Props) {
  const isMobile = useCheckMobile();
  const goBack = useGoBack();
  const router = useRouter();
  return (
    <AutoHeightPage>
      {header ?? (
        <>
          <MobileHeader
            headerLeft={hasBackButton ? <HeaderBackButton onClick={goBack} /> : undefined}
            headerRight={
              hasLoginButton ? <UserOutlined onClick={() => router.push('/register')} /> : undefined
            }
          />
          <TopHeader />
          <Header />
        </>
      )}
      <Content className={className}>{children}</Content>
      {!isMobile && <GlobalFooter />}
      <Footer />
    </AutoHeightPage>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  ${media.mobile} {
    overflow: hidden;
    align-items: center;
  }
`;

export default TabTamplete;
