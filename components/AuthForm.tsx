import styled from 'styled-components';
import LabelInput from '@/components/LabelInput';
import Button from '@/components/Button';
import QuestionLink from '@/components/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Props {
  mode: 'login' | 'register';
}

type Inputs = {
  userId: string;
  password: string;
};

function AuthForm({ mode }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { userIdPlaceholder, passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[mode];

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <LabelInput
          label="아이디"
          placeholder={userIdPlaceholder}
          {...register('userId', { required: true })}
        />
        {errors.userId?.type === 'required' && 'id를 입력해주세요'}
        <LabelInput
          {...register('password', { required: true })}
          label="비밀번호"
          placeholder={passwordPlaceholder}
        />
        {errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
      </Wrapper>

      <ActionsBox>
        <Button type="submit" styleType="primary" layoutMode="fullWidth">
          {buttonText}
        </Button>
        <QuestionLink question={question} name={actionText} href={actionLink} />
      </ActionsBox>
    </StyledForm>
  );
}

const StyledForm = styled.form``;

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
