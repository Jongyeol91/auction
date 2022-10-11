import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import LabelTextArea from '@/components/common/LableTextArea';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BasicTemplete from '@/components/templates/BasicTemplate';

const auctionsAtom = atom<FieldValues>({ category: '', subCategory: '' });

function Add() {
  const router = useRouter();
  const [auctions, set] = useAtom(auctionsAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    set(data);
    router.push('/add/addInfo');
  };

  return (
    <BasicTemplete>
      <AddTemplate title="경매" buttonText="다음" handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Group>
          <LabelInput
            label="카테고리"
            defaultValue={auctions.category}
            errorMessage={errors.category?.message?.toString()}
            {...register('category', { required: '카테고리를 입력하세요' })}
          />
          <LabelInput
            label="서브 카테고리"
            {...register('subCategory', { required: '서브 카테고리를 입력하세요' })}
          />
          <>{errors.subCategory?.message}</>
          <StyledLabelTextArea label="서브 카테고리" />
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

export default Add;
