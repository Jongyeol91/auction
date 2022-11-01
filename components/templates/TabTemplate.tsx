import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import FullHeightPage from '../common/FullHeightPage';
import Footer from '../base/Footer';
import Header from '../base/Header';

interface Props {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode | string;
}

function TabTamplete({ header, children, className }: Props) {
  return (
    <FullHeightPage>
      {header ?? (
        <>
          <MobileHeader />
          <Header />
        </>
      )}
      <Content className={className}>{children}</Content>
      <Footer />
    </FullHeightPage>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;

export default TabTamplete;
