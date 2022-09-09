import styled from 'styled-components';
import Header from '../components/Header';
import HeaderBackButton from '../components/HeaderBackButton';

export default function register() {
  return (
    <Page>
      <Header
        title="회원가입"
        headerLeft={<HeaderBackButton onClick={() => alert('뒤로가기 클릭')} />}
      />
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
`;
