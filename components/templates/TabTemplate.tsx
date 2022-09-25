import styled from 'styled-components';
import Header from '../base/Header';
import FullHeightPage from '../common/FullHeightPage';
import Footer from '../base/Footer';

interface Props {
  children?: React.ReactNode;
}

function TabTamplete({ children }: Props) {
  return (
    <FullHeightPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  );
}

const Content = styled.main`
  flex: 1;
`;

export default TabTamplete;
