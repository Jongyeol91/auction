import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { changePassword, findPassword } from '@/lib/api/user';
import { media } from '@/lib/media';
import Swal from 'sweetalert2';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import Router from 'next/router';

function AccountSetting() {
  const [user, setUser] = useAtom(userAtom);
  const isModifyMode = !!user;

  const [form, setForm] = useState({
    value1: '',
    value2: '',
  });

  const reset = () => {
    setForm({
      value1: '',
      value2: '',
    });
  };

  const { mutate: mutateChangePassword } = useMutation(changePassword, {
    onSuccess: () => {
      Swal.fire('비밀번호 변경', '비밀번호가 변경되었습니다.', 'success');
      Router.replace('/');
      reset();
    },
    onError: (e) => {
      Swal.fire('실패!', e.response.data.message, 'error');
    },
  });

  const { mutate: mutateFindPassword } = useMutation(findPassword, {
    onSuccess: () => {
      Swal.fire('비밀번호 찾기', '임시 비밀번호가 발송되었습니다.', 'success');
      Router.replace('/');
      reset();
    },
    onError: (e) => {
      Swal.fire('실패!', e.response.data.message, 'error');
    },
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name;
    const { value } = e.target;
    setForm({ ...form, [key]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isModifyMode ? mutateChangePassword(form) : mutateFindPassword(form);
  };

  // if (!user) return null;

  return (
    <Block>
      <div>
        <Title>{isModifyMode ? '내 계정' : '비밀번호 찾기'}</Title>
        {isModifyMode && (
          <Section>
            <h4>아이디</h4>
            <Username>{user?.personal.email}</Username>
          </Section>
        )}
        <Section>
          <h4>비밀번호</h4>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Input
                name="value1"
                placeholder={isModifyMode ? '현재 비밀번호' : '이름'}
                type={isModifyMode ? 'password' : 'text'}
                onChange={onChange}
                value={form.value1}
              />
              <Input
                name="value2"
                placeholder={isModifyMode ? '새 비밀번호' : '이메일'}
                type={isModifyMode ? 'password' : 'email'}
                onChange={onChange}
                value={form.value2}
              />
            </InputGroup>
            <Button styleType="secondary" type="submit">
              {isModifyMode ? ' 비밀번호 변경' : '비밀번호 찾기'}
            </Button>
          </form>
        </Section>
      </div>
      {/* <UnregisterWrapper>
        <UnregisterButton onClick={askUnregister}>계정 탈퇴</UnregisterButton>
      </UnregisterWrapper> */}
    </Block>
  );
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 800;
  color: ${colors.gray9};
  font-size: 48px;
  line-height: 1.5;
`;

const Block = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  ${media.mobile} {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    flex: initial;
    margin-top: 96px;
  }
`;

const Section = styled.section`
  h4 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 16px;
    color: ${colors.gray5};
  }

  & + & {
    margin-top: 32px;
  }
`;
const Username = styled.div`
  font-size: 16px;
  color: ${colors.gray7};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  ${media.mobile} {
    width: 460px;
  }
`;

export default AccountSetting;
