import styled from 'styled-components';
import LabelInput from '@/components/common/LabelInput';
import Button from '@/components/common/Button';
import QuestionLink from '@/components/auth/QuestionLink';
import { AUTH_DESCRIPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { defaultAxios } from '@/lib/defaultAxios';
import { useRouter } from 'next/router';
import LabelSelect from '../common/LabelSelect';
import { email, password } from '@/lib/utils/pattern';
import { media } from '@/lib/media';
import { useModifyUser, useRegister } from '@/hooks/auth';
import Swal from 'sweetalert2';
import { colors } from '@/lib/colors';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { userAtom } from '@/store';

interface Props {
  mode: 'modify' | 'register';
}

type User = {
  userId: string;
  password: string;
  businessType: string;
  businessName: string;
};

function SignUpForm({ mode }: Props) {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const isModifyMode = !!user;

  const {
    register: registerHookForm,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const { passwordPlaceholder, buttonText, question, actionLink, actionText } =
    AUTH_DESCRIPTIONS[isModifyMode ? 'modify' : 'register'];

  const { mutate: mutateRegister } = useRegister({
    onSuccess: () => {
      Swal.fire('회원가입 성공!', '회원 가입을 환영합니다!', 'success');
      router.replace('/');
    },
    onError: (e: any) => {
      Swal.fire('가입 실패!', e.response.data.message, 'error');
    },
  });

  const { mutate: mutateModifyUser } = useModifyUser({
    onSuccess: () => {
      Swal.fire('수정 성공!', '회원정보가 수정되었습니다.', 'success');
      router.replace('/');
    },
    onError: (e: any) => {
      Swal.fire('수정 실패!', e.response.data.message, 'error');
    },
  });

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

    if (!isModifyMode) {
      mutateRegister({ business, personal, account, isEnabled: 'Y' });
    } else {
      const personalUpdateCommand = {
        name,
      };
      const params = {
        data: {
          business,
          personalUpdateCommand,
          accountUpdateCommand: account,
          isEnabled: 'Y',
          inDeleted: 'Y',
        },
        id: user.id,
      };
      mutateModifyUser(params);
    }
  };

  const checkPassword = (repasswordValue: string) => {
    return getValues('password') === repasswordValue;
  };

  const handleUser = () => {
    defaultAxios.get('/api/me');
  };
  console.log(user);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <h2>계정 정보</h2>

        <LabelInput
          label="이메일"
          disabled={!!isModifyMode}
          defaultValue={isModifyMode ? user?.personal.email : ''}
          errorMessage={errors?.email?.message?.toString()}
          {...registerHookForm('email', {
            pattern: { value: email, message: '이메일 형식이 아닙니다.' },
            required: '필수 입력',
          })}
        />
        <LabelInput
          label="이름"
          defaultValue={isModifyMode ? user?.personal.name : ''}
          errorMessage={errors?.name?.message?.toString()}
          {...registerHookForm('name', { required: '필수 입력' })}
        />
        {!isModifyMode && (
          <>
            <LabelInput
              label="비밀번호"
              type="password"
              errorMessage={errors?.password?.message?.toString()}
              placeholder={passwordPlaceholder}
              {...registerHookForm('password', {
                required: '필수 입력',
                pattern: { value: password, message: '8자리 이상, 문자, 특수문자 포함' },
              })}
            />
            <LabelInput
              label="비밀번호 확인"
              type="password"
              errorMessage={errors?.repassword?.message?.toString()}
              placeholder={passwordPlaceholder}
              {...registerHookForm('repassword', {
                required: '필수 입력',
                validate: {
                  checkPassword: (v) => checkPassword(v) || '비밀번호가 일치하지 않습니다.',
                },
              })}
            />
          </>
        )}
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
          defaultValue={isModifyMode ? user?.business.businessName : ''}
          errorMessage={errors.businessName?.message?.toString()}
          {...registerHookForm('businessName', { required: '필수 입력' })}
        />
        <LabelInput
          label="대표자 명"
          defaultValue={isModifyMode ? user?.business.representative : ''}
          errorMessage={errors.representative?.message?.toString()}
          {...registerHookForm('representative', { required: '필수 입력' })}
        />
        <LabelInput
          label="사업자등록번호"
          defaultValue={isModifyMode ? user?.business.registrationNumber : ''}
          errorMessage={errors.registrationNumber?.message?.toString()}
          {...registerHookForm('registrationNumber', { required: '필수 입력' })}
        />
        <LabelInput
          label="사업자등록증"
          defaultValue={isModifyMode ? user?.business.licenceImageUrl : ''}
          errorMessage={errors.licenceImageUrl?.message?.toString()}
          {...registerHookForm('licenceImageUrl', { required: '필수 입력' })}
        />
        <h2>계좌 정보</h2>
        <LabelInput
          label="은행명"
          defaultValue={isModifyMode ? user?.account.bank : ''}
          errorMessage={errors.bank?.message?.toString()}
          {...registerHookForm('bank', { required: '필수 입력' })}
        />
        <LabelInput
          label="계좌번호"
          defaultValue={isModifyMode ? user?.account.accountNumber : ''}
          errorMessage={errors.accountNumber?.message?.toString()}
          {...registerHookForm('accountNumber', { required: '필수 입력' })}
        />
        <LabelInput
          label="예금주"
          defaultValue={isModifyMode ? user?.account.accountHolder : ''}
          errorMessage={errors.accountHolder?.message?.toString()}
          {...registerHookForm('accountHolder', { required: '필수 입력' })}
        />
        {isModifyMode && (
          <FindPassword onClick={() => router.push('setting/account')}>
            비밀번호 변경하기
          </FindPassword>
        )}
      </Wrapper>

      <ActionsBox>
        <Button type="submit" styleType="primary" layoutMode="fullWidth">
          {buttonText}
        </Button>
        {!isModifyMode && <QuestionLink question={question} name={actionText} href={actionLink} />}
      </ActionsBox>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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

const FindPassword = styled.span`
  cursor: pointer;
  color: ${colors.primary};
`;

export default SignUpForm;
