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
  const [, setUser] = useAtom(userAtom);

  const {
    watch,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const selectedMetal = watch('metal');

  useEffect(() => {
    resetField('metalOption');
  }, [resetField, selectedMetal]);

  const { data: metalData, isLoading } = useMetals();
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

  return (
    <BasicTemplete>
      <AddTemplate
        title="경매 / 역경매 만들기"
        buttonText="다음"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          <Controller
            name="auctionType"
            defaultValue={auctionFormData?.auctionType}
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
            defaultValue={auctionFormData?.metal}
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
            defaultValue={auctionFormData?.metalOptionId}
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
  flex: 1;
`;

export default Add;
