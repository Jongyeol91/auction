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
import Link from 'next/link';

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

function Add() {
  const router = useRouter();
  const [auctionFormData, setAuctionFormData] = useAtom(firstAuctionFormAtom);
  const [user, setUser] = useAtom(userAtom);
  const { openDialog } = useOpenDialog();

  const {
    watch,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    if (user) {
      setUser(user);
    } else {
      openDialog({
        title: '경매 생성',
        description: '로그인 이후 이용해주세요',
        mode: 'YESNO',
        confirmText: '로그인 하기',
        onConfirm: () => router.replace('/login'),
        onClose: () => router.replace('/'),
      });
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const selectedMetal = watch('metal');

  useEffect(() => {
    resetField('metalOptionId');
  }, [resetField, selectedMetal]);

  const { data: metalData, isLoading } = useMetals({ enabled: !!user });
  if (isLoading) return;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setAuctionFormData(data);
    router.push('/add/addInfo');
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

  if (!user) return;

  return (
    <BasicTemplete hasBackButton hasLoginButton>
      <AddTemplate
        title="경매 / 역경매 만들기"
        buttonText="다음"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          <Link href="/metal" target="_blank">
            원하는 금속이 없다면?
          </Link>
          <Controller
            name="auctionType"
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="타입"
                options={AUCTION_TYPE_OPTION}
                {...field}
                errorMessage={errors.metal?.message?.toString()}
              />
            )}
          />
          <Controller
            name="metal"
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="금속"
                options={filteredMetals()}
                {...field}
                errorMessage={errors.metal?.message?.toString()}
              />
            )}
          />
          <Controller
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
`;

export default Add;
