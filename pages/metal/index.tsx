import AddTemplate from '@/components/add/AddTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BasicTemplete from '@/components/templates/BasicTemplate';
import LabelSelect from '@/components/common/LabelSelect';
import { useMetals } from '@/hooks/auctions';
import { useEffect } from 'react';
import { AUCTION_TYPE_OPTION } from '@/lib/constants';
import { userAtom } from '@/store';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { useOpenDialog } from '@/hooks/useDialog';
import LabelInput from '@/components/common/LabelInput';
import { useMutation } from '@tanstack/react-query';
import { createMetal } from '@/lib/api/metal';
import Swal from 'sweetalert2';

interface FirstAuctionForm {
  auctionType: 'NORMAL' | 'REVERSE';
  metal: string;
  metalOptionId: number | null;
}

export const firstAuctionFormAtom = atom<FirstAuctionForm>({
  auctionType: 'NORMAL',
  metal: '',
  metalOptionId: null,
});

function MetalPage() {
  const router = useRouter();
  const [auctionFormData, setAuctionFormData] = useAtom(firstAuctionFormAtom);
  const [user, setUser] = useAtom(userAtom);
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
        onConfirm: () => router.replace('/login'),
        onClose: () => router.replace('/'),
      });
    }
  };

  const { mutate: createMetalMutate } = useMutation(createMetal, {
    onSuccess: async () => {
      Swal.fire('금속 등록 성공', '금속이 등록되었습니다.', 'success');
    },
    onError: (e: any) => {
      Swal.fire('금속 등록 실패', e.response.data.message, 'error');
    },
  });

  const { data: metalData, isLoading } = useMetals({ enabled: !!user });
  if (isLoading) return;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    createMetalMutate(data);
    //router.push('/add/addInfo');
  };

  const filteredMetals = () => {
    const metals = metalData?.map((data: { name: string; id: number }) => ({
      label: data.name,
      value: data.id,
    }));
    return metals;
  };

  const filteredMetalOptions = () => {
    const options = metalData
      ?.filter((data) => data.id === selectedMetal)
      .map((data) =>
        data.metalOptions.map((metalOption: { id: string; name: string }) => ({
          label: metalOption.name,
          value: metalOption.id,
        })),
      )[0];

    return options;
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

          {/* <Controller
            name="metalOptionId"
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="금속 옵션"
                options={filteredMetalOptions()}
                {...field}
                errorMessage={errors.metalOptionId?.message?.toString()}
              />
            )}
          /> */}
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
