import Header from '@/components/base/Header';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';
import AuthForm from '@/components/auth/AuthForm';
import FullHeightPage from '@/components/common/FullHeightPage';

export default function Register() {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </FullHeightPage>
  );
}
