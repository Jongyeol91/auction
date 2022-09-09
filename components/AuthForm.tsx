import styled from 'styled-components';
import LabelInput from './LabelInput';

interface Props {
  mode: 'login' | 'register';
}

function AuthForm({ mode }: Props) {
  return (
    <Wrapper>
      <LabelInput label="아이디" />
      <LabelInput label="비밀번호" />
    </Wrapper>
  );
}

export default AuthForm;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;
