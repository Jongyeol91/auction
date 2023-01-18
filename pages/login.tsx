import FullHeightPage from '@/components/common/FullHeightPage';
import MobileHeader from '@/components/base/MobileHeader';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';
import SignInForm from '@/components/auth/SignInForm';

export default function Login() {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <MobileHeader title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <SignInForm mode="login" />
    </FullHeightPage>
  );
}
