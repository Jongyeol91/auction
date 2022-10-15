import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import LabelTextArea from '@/components/common/LableTextArea';
import TabTamplete from '@/components/templates/TabTemplate';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import LabelDatePicker from '@/components/common/LabelDatePicker';

const auctionsAtom = atom<FieldValues>({ category: '', subCategory: '' });

function Add() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [auctions, set] = useAtom(auctionsAtom);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    set(data);
  };

  return (
    <>
      <TabTamplete>
        <AddTemplate title="경매" buttonText="다음" handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <Group>
            <LabelInput label="물량" {...register('amount', { required: true })} />

            <LabelInput label="단가" {...register('unit', { required: true })} />
            <LabelDatePicker
              label="마감일"
              id="sefsefesg"
              control={control}
              {...register('date', { required: true })}
            />
          </Group>
        </AddTemplate>
      </TabTamplete>
      {auctions.category}
    </>
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

export default Add;
