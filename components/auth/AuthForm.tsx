import styled from 'styled-components';
import LabelInput from '@/components/common/LabelInput';
import Button from '@/components/common/Button';
import QuestionLink from '@/components/auth/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login, register } from '@/lib/api/auth';
import { defaultAxios } from '@/lib/defaultAxios';
import { useRouter } from 'next/router';
import { media } from '@/lib/media';

interface Props {
  mode: 'login' | 'register';
}

type Inputs = {
  userId: string;
  password: string;
};

function AuthForm({ mode }: Props) {
  const {
    register: registerHookForm,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { userIdPlaceholder, passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[mode];

  const router = useRouter;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === 'register') {
      await register(data);
    } else {
      const { result, status } = await login(data);
      status === 200 && router.replace('/');
    }
  };

  const handleUser = () => {
    defaultAxios.get('/api/me');
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <LabelInput
          label="아이디"
          placeholder={userIdPlaceholder}
          errorMessage={errors.userId?.type === 'required' && '아이디를 입력해주세요'}
          {...registerHookForm('userId', { required: true })}
        />
        <LabelInput
          {...registerHookForm('password', { required: true })}
          label="비밀번호"
          errorMessage={errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
          placeholder={passwordPlaceholder}
        />
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${media.mobile} {
    justify-content: center;
    width: 460px;
    align-self: center;
  }
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  gap: 16px;
  flex-direction: column;
`;

const ActionsBox = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  ${media.mobile} {
    margin-top: 24px;
  }
`;

export default AuthForm;
