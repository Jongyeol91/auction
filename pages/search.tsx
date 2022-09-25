import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';
import FullHeightPage from '@/components/common/FullHeightPage';
import styled from 'styled-components';

function Search() {
  return (
    <FullHeightPage>
      <Header />
      <Content />
      <Footer />
    </FullHeightPage>
  );
}

const Content = styled.div`
  flex: 1;
`;

export default Search;
