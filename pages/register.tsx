import styled from 'styled-components';
import Header from '../components/Header';
import HeaderBackButton from '../components/HeaderBackButton';
import { useGoBack } from '../hooks/useGoBack';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const goBack = useGoBack();
  return (
    <Page>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
`;
