import AuthForm from '@/components/auth/AuthForm';
import FullHeightPage from '@/components/common/FullHeightPage';
import MobileHeader from '@/components/base/MobileHeader';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';

export default function Login() {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <MobileHeader title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="login" />
    </FullHeightPage>
  );
}
