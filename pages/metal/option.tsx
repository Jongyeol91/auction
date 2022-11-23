import BasicTemplete from '@/components/templates/BasicTemplate';
import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { createMetalOption } from '@/lib/api/metal';
import Swal from 'sweetalert2';
import { useOpenDialog } from '@/hooks/useDialog';
import LabelSelect from '@/components/common/LabelSelect';
import { useMetals } from '@/hooks/auctions';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { useRouter } from 'next/router';

function Option() {
  const { openDialog } = useOpenDialog();
  const {
    register,
    watch,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selectedMetal = watch('metal');

  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    if (user) {
      setUser(user);
    }
  };

  const { data: metalData, isLoading } = useMetals({ enabled: !!user });
  const { mutate: createMetalOptionMutate } = useMutation(createMetalOption, {
    onSuccess: async () => {
      openDialog({
        title: '금속 옵션 생성',
        description: '금속 옵션이 생성되었습니다. 경매 만들기 페이지로 이동합니다.',
        onConfirm: () => router.replace('/add'),
      });
    },
    onError: (e: any) => {
      Swal.fire('금속 옵션 등록 실패', e.response.data.message, 'error');
    },
  });

  const onSubmit: SubmitHandler<{ metalId: number; name: string }> = (data) => {
    createMetalOptionMutate(data);
  };

  const filteredMetals = () => {
    const metals = metalData?.map((data: { name: string; id: number } | FieldValues) => ({
      label: data.name,
      value: data.id,
    }));
    return metals;
  };

  useEffect(() => {
    resetField('metalOption');
  }, [resetField, selectedMetal]);

  return (
    <BasicTemplete>
      <AddTemplate
        title="금속 옵션 만들기"
        buttonText="다음"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          <Controller
            name="metalId"
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="금속"
                options={filteredMetals()}
                {...field}
                errorMessage={errors.metalId?.message?.toString()}
              />
            )}
          />
          <LabelInput
            label="금속옵션"
            errorMessage={errors.name?.message?.toString()}
            {...register('name', { required: '필수 입력' })}
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

export default Option;
