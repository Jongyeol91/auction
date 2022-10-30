import AddTemplate from '@/components/add/AddTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BasicTemplete from '@/components/templates/BasicTemplate';
import LabelSelect from '@/components/common/LabelSelect';
import { useMetals } from '@/hooks/auctions';
import { useEffect } from 'react';

export const auctionsAtom = atom<FieldValues>({ metals: '', metalOptions: '' });

function Add() {
  const router = useRouter();
  const [auctions, set] = useAtom(auctionsAtom);
  const {
    watch,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedMetal = watch('metal');

  useEffect(() => {
    resetField('metalOption');
  }, [resetField, selectedMetal]);

  const { data: metalData, isLoading } = useMetals();
  if (isLoading) return;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    set(data);
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
        data.metalOptions.map((metalOption) => ({
          label: metalOption.name,
          value: metalOption.id,
        })),
      )[0];

    return options;
  };

  return (
    <BasicTemplete>
      <AddTemplate
        title="경매ㅎㅎ"
        buttonText="다음"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          <Controller
            name="auctionType"
            defaultValue={'NORMAL'}
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="타입"
                options={[
                  { label: '경매', value: 'NORMAL' },
                  { label: '역경매', value: 'REVERSE' },
                ]}
                {...field}
                errorMessage={errors.metal?.message?.toString()}
              />
            )}
          />
          <Controller
            name="metal"
            defaultValue={auctions.metal}
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
            name="metalOption"
            defaultValue={auctions.metalOption}
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="금속 옵션"
                options={filteredMetalOptions()}
                {...field}
                errorMessage={errors.metalOption?.message?.toString()}
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
  }
`;

export default Add;
