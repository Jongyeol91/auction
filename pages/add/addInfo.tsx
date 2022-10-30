import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import TabTamplete from '@/components/templates/TabTemplate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import LabelDatePicker from '@/components/common/LabelDatePicker';
import LabelTextArea from '@/components/common/LableTextArea';
import { auctionsAtom } from '.';
import dayjs from 'dayjs';
import { useCreateAuction } from '@/hooks/auctions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

function Add() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [auctions, setAuctions] = useAtom(auctionsAtom);

  const { mutate } = useCreateAuction({
    onSuccess: () => {
      queryClient.invalidateQueries(['auctions']);
      router.replace('/');
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setAuctions((prev) => ({ ...prev, ...data }));
    const auctionItem = {
      amount: data.amount,
      price: data.price,
      metalOptionId: auctions.metalOption,
    };
    const reqBody = {
      auctionType: auctions.auctionType,
      endTime: dayjs(data.endTime).format('YYYY-MM-DD hh:mm'),
      auctionItem,
    };

    mutate(reqBody);
  };

  return (
    <TabTamplete>
      <AddTemplate title="경매" buttonText="다음" handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Group>
          <LabelInput
            label="물량"
            type="number"
            defaultValue={auctions.amount}
            errorMessage={errors.amount?.message?.toString()}
            {...register('amount', { valueAsNumber: true, required: '필수 입력' })}
          />
          <LabelInput
            label="단가"
            type="number"
            defaultValue={auctions.price}
            errorMessage={errors.price?.message?.toString()}
            {...register('price', { valueAsNumber: true, required: '필수 입력' })}
          />
          <Controller
            name="endTime"
            defaultValue={auctions.endTime}
            control={control}
            rules={{ required: '필수 입력' }}
            render={({ field }) => (
              <LabelDatePicker
                label="마감일"
                {...field}
                errorMessage={errors.endTime?.message?.toString()}
              />
            )}
          />
          <StyledLabelTextArea
            label="설명"
            defaultValue={auctions.descriptions}
            {...register('description')}
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
