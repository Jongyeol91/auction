import styled from 'styled-components';
import LabelInput from '@/components/LabelInput';
import Button from '@/components/Button';
import QuestionLink from '@/components/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';

interface Props {
  mode: 'login' | 'register';
}

function AuthForm({ mode }: Props) {
  const { userIdPlaceholder, passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[mode];

  return (
    <>
      <Wrapper>
        <LabelInput label="아이디" placeholder={userIdPlaceholder} />
        <LabelInput label="비밀번호" placeholder={passwordPlaceholder} />
      </Wrapper>

      <ActionsBox>
        <Button styleType="primary" layoutMode="fullWidth">
          {buttonText}
        </Button>
        <QuestionLink question={question} name={actionText} href={actionLink} />
      </ActionsBox>
    </>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ActionsBox = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export default AuthForm;
