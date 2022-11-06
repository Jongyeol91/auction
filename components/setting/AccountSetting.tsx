import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { changePassword } from '@/lib/api/user';
import { media } from '@/lib/media';
import Swal from 'sweetalert2';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';

function AccountSetting() {
  const [user] = useAtom(userAtom);
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const reset = () => {
    setForm({
      oldPassword: '',
      newPassword: '',
    });
  };

  const { mutate: mutateChangePassword } = useMutation(changePassword, {
    onSuccess: () => {
      Swal.fire('비밀번호 변경', '비밀번호가 변경되었습니다.', 'success');
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
    mutateChangePassword(form);
  };

  if (!user) return null;

  return (
    <Block>
      <div>
        <Title>내 계정</Title>
        <Section>
          <h4>아이디</h4>
          <Username>{user?.name}</Username>
        </Section>
        <Section>
          <h4>비밀번호</h4>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Input
                name="oldPassword"
                placeholder="현재 비밀번호"
                type="password"
                onChange={onChange}
                value={form.oldPassword}
              />
              <Input
                name="newPassword"
                placeholder="새 비밀번호"
                type="password"
                onChange={onChange}
                value={form.newPassword}
              />
            </InputGroup>
            <Button styleType="secondary" type="submit">
              비밀번호 변경
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
  color: ${colors.gray5};
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
    color: ${colors.gray3};
  }

  & + & {
    margin-top: 32px;
  }
`;
const Username = styled.div`
  font-size: 16px;
  color: ${colors.gray5};
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
