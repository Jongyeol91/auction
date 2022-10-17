import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import TabTamplete from '@/components/templates/TabTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import LabelDatePicker from '@/components/common/LabelDatePicker';

const auctionsAtom = atom<FieldValues>({ metal: '', metalOptions: '' });

function Add() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [auctions, setAuctions] = useAtom(auctionsAtom);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setAuctions((prev) => ({ ...prev, ...data }));
  };

  return (
    <TabTamplete>
      <AddTemplate title="경매" buttonText="다음" handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Group>
          <LabelInput
            label="물량"
            errorMessage={errors.amount?.message?.toString()}
            {...register('amount', { required: '필수 입력' })}
          />
          <LabelInput
            label="단가"
            errorMessage={errors.unit?.message?.toString()}
            {...register('unit', { required: '필수 입력' })}
          />
          <Controller
            name="lastDate"
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelDatePicker
                label="마감일"
                {...field}
                errorMessage={errors.lastDate?.message?.toString()}
              />
            )}
          />
        </Group>
      </AddTemplate>
    </TabTamplete>
  );
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`;

export async function getServerSideProps() {
  return { props: {} };
}

export default Add;
