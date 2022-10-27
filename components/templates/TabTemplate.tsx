import styled from 'styled-components';
import Header from '../base/Header';
import FullHeightPage from '../common/FullHeightPage';
import Footer from '../base/Footer';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function TabTamplete({ children, className }: Props) {
  return (
    <FullHeightPage>
      <Header />
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
