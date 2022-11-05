import styled from 'styled-components';
import LabelInput from '@/components/common/LabelInput';
import Button from '@/components/common/Button';
import QuestionLink from '@/components/auth/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { login, register } from '@/lib/api/auth';
import { defaultAxios } from '@/lib/defaultAxios';
import { useRouter } from 'next/router';
import LabelSelect from '../common/LabelSelect';
import { email, password } from '@/lib/utils/pattern';
import { media } from '@/lib/media';

interface Props {
  mode: 'login' | 'register';
}

type User = {
  userId: string;
  password: string;
  businessType: string;
  businessName: string;
};

function SignUpForm({ mode }: Props) {
  const {
    register: registerHookForm,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  const { userIdPlaceholder, passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[mode];

  const router = useRouter;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const {
      businessType,
      businessName,
      representative,
      registrationNumber,
      licenceImageUrl,
      name,
      email,
      password,
      bank,
      accountNumber,
      accountHolder,
    } = data;
    if (mode === 'register') {
      const business = {
        businessType,
        businessName,
        representative,
        registrationNumber,
        licenceImageUrl,
      };
      const personal = {
        name,
        email,
        password,
      };
      const account = {
        bank,
        accountNumber,
        accountHolder,
      };

      await register({ business, personal, account, isEnabled: 'Y' });
    } else {
      const { result, status } = await login(data);
      status === 200 && router.replace('/');
    }
  };

  const checkPassword = (repasswordValue: string) => {
    return getValues('password') === repasswordValue;
  };

  const handleUser = () => {
    defaultAxios.get('/api/me');
  };

  console.log(errors);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <h2>계정 정보</h2>
        <LabelInput
          label="이메일"
          placeholder={userIdPlaceholder}
          errorMessage={errors?.email?.message?.toString()}
          {...registerHookForm('email', {
            required: '필수 입력',
            pattern: { value: email, message: '이메일 형식이 아닙니다.' },
          })}
        />
        <LabelInput
          label="이름"
          placeholder={userIdPlaceholder}
          errorMessage={errors?.name?.message?.toString()}
          {...registerHookForm('name', { required: '필수 입력' })}
        />
        <LabelInput
          label="비밀번호"
          errorMessage={errors?.password?.message?.toString()}
          placeholder={passwordPlaceholder}
          {...registerHookForm('password', {
            required: '필수 입력',
            pattern: { value: password, message: '8자리 이상, 특수문자 포함' },
          })}
        />
        <LabelInput
          label="비밀번호 확인"
          errorMessage={errors?.repassword?.message?.toString()}
          placeholder={passwordPlaceholder}
          {...registerHookForm('repassword', {
            required: '필수 입력',
            validate: {
              checkPassword: (v) => checkPassword(v) || '비밀번호가 일치하지 않습니다.',
            },
          })}
        />
        <h2>회사 정보</h2>
        <Controller
          name="businessType"
          defaultValue={'PERSONAL'}
          control={control}
          rules={{ required: '필수 입력' }}
          render={({ field }) => (
            <LabelSelect
              label="계정유형"
              options={[
                { label: '개인사업자', value: 'PERSONAL' },
                { label: '법인사업자', value: 'CORPORATION' },
              ]}
              {...field}
              errorMessage={errors.businessType?.message?.toString()}
            />
          )}
        />
        <LabelInput
          label="회사명"
          errorMessage={errors.businessName?.message?.toString()}
          {...registerHookForm('businessName', { required: '필수 입력' })}
        />
        <LabelInput
          label="대표자 명"
          errorMessage={errors.representative?.message?.toString()}
          {...registerHookForm('representative', { required: '필수 입력' })}
        />
        <LabelInput
          type="number"
          label="사업자등록번호"
          errorMessage={errors.registrationNumber?.message?.toString()}
          {...registerHookForm('registrationNumber', { required: '필수 입력' })}
        />
        <LabelInput
          label="사업자등록증"
          errorMessage={errors.licenceImageUrl?.message?.toString()}
          {...registerHookForm('licenceImageUrl', { required: '필수 입력' })}
        />
        <h2>계좌 정보</h2>
        <LabelInput
          label="은행명"
          errorMessage={errors.bank?.message?.toString()}
          {...registerHookForm('bank', { required: '필수 입력' })}
        />
        <LabelInput
          label="계좌번호"
          type="number"
          errorMessage={errors.accountNumber?.message?.toString()}
          {...registerHookForm('accountNumber', { required: '필수 입력' })}
        />
        <LabelInput
          label="계좌명"
          errorMessage={errors.accountHolder?.message?.toString()}
          {...registerHookForm('accountHolder', { required: '필수 입력' })}
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

export default SignUpForm;
