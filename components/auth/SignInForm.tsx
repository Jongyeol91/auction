import styled from 'styled-components';
import LabelInput from '@/components/common/LabelInput';
import Button from '@/components/common/Button';
import QuestionLink from '@/components/auth/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login, register } from '@/lib/api/auth';
import { defaultAxios, setDefaultAxiosAuth } from '@/lib/defaultAxios';
import { useRouter } from 'next/router';
import { media } from '@/lib/media';
import { getCookieToken, setCookieToken } from '@/lib/cookie';
import Swal from 'sweetalert2';

interface Props {
  mode: 'login' | 'register';
}

type Inputs = {
  email: string;
  password: string;
};

function SignInForm({ mode }: Props) {
  const {
    register: registerHookForm,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { userIdPlaceholder, passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[mode];

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === 'register') {
      await register(data);
    } else {
      console.log('start');

      try {
        const { status, result } = await login(data);
        if (status == 200) {
          // setCookieToken('accessToken', result.token, {
          //   path: '/',
          //   secure: true,
          //   sameTite: 'none',
          // });
          await localStorage.setItem('accessToken', result.token);
          await setDefaultAxiosAuth(result.token);
          router.replace('/');
          // const token = getCookieToken('accessToken');
          // console.log(token);
        }
      } catch (e) {
        Swal.fire('실패', e.response.data.message, 'error');
      }
    }
  };

  const handleUser = () => {
    defaultAxios.get('/api/me');
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <LabelInput
          label="이메일"
          placeholder={userIdPlaceholder}
          errorMessage={errors.email?.type === 'required' && '이메일을 입력해주세요'}
          {...registerHookForm('email', { required: true })}
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
        <QuestionLinkWrapper>
          <QuestionLink question={question} name={actionText} href={actionLink} />
          <QuestionLink
            question={'비밀번호가 기억나지 않으세요?'}
            name={'비빌번호 찾기'}
            href={'/setting/account'}
          />
        </QuestionLinkWrapper>
      </ActionsBox>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  ${media.mobile} {
    justify-content: center;
    width: 460px;
    align-self: center;
  }
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const QuestionLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default SignInForm;
