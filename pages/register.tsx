import Header from '../components/Header';
import HeaderBackButton from '../components/HeaderBackButton';
import { useGoBack } from '../hooks/useGoBack';
import AuthForm from '../components/AuthForm';
import FullHeightPage from '../components/FullHeightPage';

export default function Register() {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </FullHeightPage>
  );
}
