import AddTemplate from '@/components/add/AddTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BasicTemplete from '@/components/templates/BasicTemplate';
import LabelSelect from '@/components/common/LabelSelect';
import { useMetals } from '@/hooks/auctions';

const auctionsAtom = atom<FieldValues>({ metals: '', metalOptions: '' });

function Add() {
  const router = useRouter();
  const [auctions, set] = useAtom(auctionsAtom);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: metalData, isLoading } = useMetals();
  if (isLoading) return;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    set(data);
    router.push('/add/addInfo');
  };

  return (
    <BasicTemplete>
      <AddTemplate title="경매" buttonText="다음" handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Group>
          <Controller
            name="metal"
            defaultValue={auctions.metal}
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelSelect
                label="금속"
                options={metalData?.metals}
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
                options={metalData?.metalOptions}
                {...field}
                errorMessage={errors.metalOption?.message?.toString()}
              />
            )}
          />

          {/* <LabelInput
            label="금속"
            defaultValue={auctions.metal}
            errorMessage={errors.metal?.message?.toString()}
            {...register('metal', { required: '금속 종류를 입력하세요' })}
          />
          <LabelInput
            label="금속 옵션"
            defaultValue={auctions.metalOption}
            errorMessage={errors.metalOption?.message?.toString()}
            {...register('metalOption', { required: '금속 옵션을 입력하세요' })}
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
    flex: 1;
  }
`;

export default Add;
