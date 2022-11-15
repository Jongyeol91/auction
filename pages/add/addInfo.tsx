import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import LabelTextArea from '@/components/common/LableTextArea';
import { useCreateAuction } from '@/hooks/auctions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { AUCTION_TYPE } from '@/lib/constants';
import { useEffect } from 'react';
import { userAtom } from '@/store';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { createAuctiomImage } from '@/lib/api/auctions';
import Field from '@/components/common/Field';
import LabelDatePicker from '@/components/common/LabelDatePicker';
import dayjs from 'dayjs';
import { AuctionItemParam } from '@/lib/api/types';
import { firstAuctionFormAtom } from '@/pages/add/index';
import BasicTemplete from '@/components/templates/BasicTemplate';
import { useOpenDialog } from '@/hooks/useDialog';

interface SecondFormParams {
  auctionItem: AuctionItemParam;
  endTime: string;
  price: number;
  description?: string;
  auctionImageFile: File;
}

interface SecondFormSubmitData {
  amount: number;
  price: number;
  metalOptionId: number;
  endTime: string;
  description?: string;
  auctionImageFile: File;
}

const secondAuctionFormAtom = atom<SecondFormParams | null>(null);

function Add() {
  const [firstAuctionFormData, setFirstAuctionFormData] = useAtom(firstAuctionFormAtom);
  const [secondAuctionFormData, setSecondAuctionFormData] = useAtom(secondAuctionFormAtom);
  const [user, setUser] = useAtom(userAtom);
  const { openDialog } = useOpenDialog();

  const router = useRouter();
  const queryClient = useQueryClient();

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    if (!firstAuctionFormData.metal) {
      openDialog({ title: '새로고침 발생', description: '경매를 다시 만들어주세요' });
      router.push('/add');
    }
    if (!user) {
      getUser();
    }
  }, []);

  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: mutateCreateAuction } = useCreateAuction({
    onSuccess: async () => {
      queryClient.invalidateQueries(['auctions']);
      Swal.fire(
        '생성 성공!',
        `${AUCTION_TYPE[firstAuctionFormData.auctionType]}가 생성되었습니다.`,
        'success',
      );
      router.replace('/');
    },
    onError: (e: any) => {
      Swal.fire('생성 실패', e.response.data.message, 'error');
    },
  });

  const { mutate: mutateImage } = useMutation(createAuctiomImage, {
    onSuccess: async ({ imageUrl }: { imageUrl: string }) => {
      console.log('s3 이미지 등록 완료: ', imageUrl);
    },
    onError: (e: any) => {
      Swal.fire('이미지 업로드 실패', e.response.data.message, 'error');
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: SecondFormSubmitData) => {
    const auctionItem = {
      amount: data.amount,
      price: data.price,
      metalOptionId: firstAuctionFormData?.metalOptionId,
    };
    const currentPageAuctionFormData = {
      auctionItem,
      endTime: dayjs(data.endTime).format('YYYY-MM-DD HH:mm:ss'),
      description: data.description,
    };
    setSecondAuctionFormData(currentPageAuctionFormData);

    const auctionImageFile = data.auctionImageFile;
    mutateImage(auctionImageFile, {
      onSuccess: ({ imageUrl }) => {
        setFirstAuctionFormData({
          auctionType: 'NORMAL',
          metal: '',
          metalOptionId: null,
        });
        mutateCreateAuction({
          auctionType: firstAuctionFormData?.auctionType,
          endTime: dayjs(data.endTime).format('YYYY-MM-DD HH:mm:ss'),
          auctionItem,
          description: data.description,
          auctionImageUrl: imageUrl,
        });
      },
    });
  };

  return (
    <BasicTemplete>
      <AddTemplate
        title="경매 / 역경매 만들기"
        buttonText="생성하기"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Group>
          {/* <LabelInput
            label="이미지"
            type="file"
            accept=".jpg,.jpeg,.png"
            errorMessage={errors.metalOption?.message?.toString()}
            {...register('auctionImageUrl', { required: '필수 입력' })}
          /> */}
          <Field
            label="이미지"
            name="auctionImageUrl"
            fileName="auctionImageFile"
            methods={methods}
            type="imageUpload"
          />
          <LabelInput
            label="물량 (톤)"
            type="number"
            min={1}
            defaultValue={secondAuctionFormData?.auctionItem.amount}
            errorMessage={errors.amount?.message?.toString()}
            {...register('amount', { valueAsNumber: true, required: '필수 입력' })}
          />
          <LabelInput
            label="단가 (원)"
            type="number"
            min={1}
            defaultValue={secondAuctionFormData?.auctionItem.price}
            errorMessage={errors.price?.message?.toString()}
            {...register('price', { valueAsNumber: true, required: '필수 입력' })}
          />
          <Controller
            name="endTime"
            defaultValue={secondAuctionFormData?.endTime}
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
            defaultValue={secondAuctionFormData?.description}
            {...register('description')}
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
