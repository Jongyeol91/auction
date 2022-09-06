import styled from 'styled-components';
import Header from '../components/Header';

export default function register() {
  return (
    <Page>
      <Header title="회원가입" />
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
`;
