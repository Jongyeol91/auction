import AddTemplate from '@/components/add/AddTemplate';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BasicTemplete from '@/components/templates/BasicTemplate';
import { useEffect } from 'react';
import { userAtom } from '@/store';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { useOpenDialog } from '@/hooks/useDialog';
import LabelInput from '@/components/common/LabelInput';
import { useMutation } from '@tanstack/react-query';
import { createMetal } from '@/lib/api/metal';

function MetalPage() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const { openDialog } = useOpenDialog();

  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selectedMetal = watch('metal');

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    resetField('metalOption');
  }, [resetField, selectedMetal]);

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    if (user) {
      setUser(user);
    } else {
      openDialog({
        title: '금속 생성',
        description: '로그인 이후 이용해주세요',
        mode: 'YESNO',
        confirmText: '로그인 하기',
        onClose: () => router.replace('/'),
      });
    }
  };

  const { mutate: createMetalMutate } = useMutation(createMetal, {
    onSuccess: async () => {
      openDialog({
        title: '금속 생성 완료',
        description: '금속 옵션 만들기로 이동합니다.',
        onConfirm: () => router.replace('/metal/option'),
      });
    },
    onError: (e: any) => {
      openDialog({
        title: e.response.data.message,
        description: '금속 옵션 만들기로 이동합니다.',
        onConfirm: () => router.replace('/metal/option'),
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createMetalMutate(data);
  };

  return (
    <BasicTemplete>
      <AddTemplate
        title="금속 만들기"
        buttonText="다음"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          <LabelInput
            label="금속"
            errorMessage={errors.metal?.message?.toString()}
            {...register('metal', { required: '필수 입력' })}
          />
        </Group>
      </AddTemplate>
    </BasicTemplete>
  );
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`;

export default MetalPage;
