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
import Swal from 'sweetalert2';
import { AUCTION_TYPE } from '@/lib/constants';

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
      Swal.fire(
        '생성 성공!',
        `${AUCTION_TYPE[auctions.auctionType]}매가 생성되었습니다.`,
        'success',
      );
      router.replace('/');
    },
    onError: (e: any) => {
      Swal.fire('생성 실패', e.response.data.message, 'error');
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
      auctionImageUrl: auctions.auctionImageUrl,
      auctionType: auctions.auctionType,
      endTime: dayjs(data.endTime).format('YYYY-MM-DD HH:mm:ss'),
      auctionItem,
      description: data.description,
    };

    mutate(reqBody);
  };

  return (
    <TabTamplete>
      <AddTemplate
        title="경매 / 역경매 만들기"
        buttonText="생성하기"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
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
