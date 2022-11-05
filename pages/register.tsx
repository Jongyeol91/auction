import SignUpForm from '@/components/auth/SignUpForm';
import BasicTemplete from '@/components/templates/BasicTemplate';

export default function Register() {
  return (
    <BasicTemplete hasBackButton>
      <SignUpForm mode="register" />
    </BasicTemplete>
  );
}
