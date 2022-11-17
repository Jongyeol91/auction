import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import Footer from '../base/MobileBottomNavigation';
import Header from '../base/Header';
import TopHeader from '../base/TopHeader';
import { media } from '@/lib/media';
import AutoHeightPage from '../common/AutoHeightPage';
import GlobalFooter from '../base/GlobalFooter';
import useCheckMobile from '@/hooks/useCheckMobile';

interface Props {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode | string;
}

function TabTamplete({ header, children, className }: Props) {
  const isMobile = useCheckMobile();
  return (
    <AutoHeightPage>
      {header ?? (
        <>
          <MobileHeader />
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
  }
`;

export default TabTamplete;
