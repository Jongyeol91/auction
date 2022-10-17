import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import TabTamplete from '@/components/templates/TabTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import LabelDatePicker from '@/components/common/LabelDatePicker';
import LabelTextArea from '@/components/common/LableTextArea';

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
            defaultValue={auctions.amount}
            errorMessage={errors.amount?.message?.toString()}
            {...register('amount', { required: '필수 입력' })}
          />
          <LabelInput
            label="단가"
            defaultValue={auctions.unit}
            errorMessage={errors.unit?.message?.toString()}
            {...register('unit', { required: '필수 입력' })}
          />
          <Controller
            name="lastDate"
            defaultValue={auctions.lastDate}
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
          <StyledLabelTextArea label="설명" />
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

const StyledLabelTextArea = styled(LabelTextArea)`
  display: flex;
  flex: 1;
  textarea {
    flex: 1;
  }
`;

export async function getServerSideProps() {
  return { props: {} };
}

export default Add;
