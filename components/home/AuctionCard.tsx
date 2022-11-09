import { type AuctionContent } from '@/lib/api/types';
import { colors } from '@/lib/colors';
import styled from 'styled-components';
import User from '@/components/vectors/User.svg';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { media } from '@/lib/media';
import { useState } from 'react';
import Button from '../common/Button';
import { Statistic } from 'antd';
import { bid } from '@/lib/api/auctions';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const { Countdown } = Statistic;

interface Props {
  auctionContent: AuctionContent;
  forbidden: boolean;
}

const typeMap = {
  NORMAL: '경매',
  REVERSE: '역경매',
};

const auctionTypeColorMap = {
  NORMAL: 'green',
  REVERSE: 'blue',
};

const auctionStatusMap = {
  ACTIVE: '진행중',
  FAILED: '유찰',
  COMPLETED: '완료',
};

const timer = (endtime: string): React.ReactNode => {
  const now = dayjs();
  const _endtime = dayjs(endtime);

  const remainMilliseconds = now.diff(_endtime, 'milliseconds') * -1;
  const deadline = Date.now() + remainMilliseconds; // Moment is also O

  const remainHours = now.diff(_endtime, 'hours');
  let remainDays = Math.floor(remainHours / 24);
  remainDays *= -1;

  const imminent = remainDays < 7;
  return (
    <>
      <Tag color={imminent ? 'error' : ''}>
        <Countdown
          value={deadline}
          valueStyle={{ fontSize: 12, color: imminent ? 'red' : 'black' }}
          format="D일 HH시간 mm분 ss초"
        ></Countdown>
      </Tag>
    </>
  );
};

function AuctionCard({ auctionContent, forbidden }: Props) {
  const {
    id,
    auctionItem,
    auctionImageUrl,
    hostUser,
    auctionType,
    endTime,
    description,
    auctionStatusType,
  } = auctionContent;
  const { metalName, metalOptionName, amount, price } = auctionItem;

  const [seletced, setSelected] = useState<boolean>(false);

  const { mutate: mutateBid } = useMutation(bid, {
    onSuccess: () => {
      Swal.fire('입찰', '입찰 하였습니다.', 'success');
    },
    onError: (e) => {
      Swal.fire('입찰 실패', e.response.data.message, 'error');
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutateBid({ ...data, auctionId: id });
  };

  const statusTag = () => {
    const statusText = auctionStatusMap[auctionStatusType];
    if (auctionStatusType == 'ACTIVE') {
      return <Tag color={colors.primary}>{statusText}</Tag>;
    }

    return <Tag>{statusText}</Tag>;
  };

  return (
    <Block>
      {auctionImageUrl ? (
        <Thumbnail src={auctionImageUrl} alt={metalName} onClick={() => setSelected(!seletced)} />
      ) : null}
      <FirstLine>
        <TitleWrapper>
          <Tag color={auctionTypeColorMap[auctionType]}>{typeMap[auctionType]}</Tag>
          {statusTag()}
          <Tag>{metalName}</Tag>
          <Tag>{metalOptionName}</Tag>
        </TitleWrapper>
        <UserWrapper>
          <User />
          {hostUser?.personal.name}
        </UserWrapper>
      </FirstLine>
      <TitleWrapper>
        <Tag>{amount + '톤'}</Tag>
        <Tag>{'톤 당 ' + price + '원'}</Tag>
        {timer(endTime)}
        {/* <Tag>{dayjs(endTime).format('YY/MM/DD hh:mm 종료')}</Tag> */}
      </TitleWrapper>
      <DescriptionArea>{description}</DescriptionArea>
      {seletced && auctionStatusType === 'ACTIVE' && !forbidden && (
        <Bid onSubmit={handleSubmit(onSubmit)}>
          <StyledInput type="number" min={1} {...register('price', { required: '필수 입력' })} />
          <Button styleType="primary" type="submit">
            입찰
          </Button>
        </Bid>
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledInput = styled.input`
  padding: 6px;
  margin-right: 8px;
  width: 100%;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  h3 {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray6};
    margin: 0;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: ${colors.gray7};
  align-items: center;
  gap: 4px;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 288/192;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
  display: block; // lineheight 때문에 불필요한 여백 방지
  margin-bottom: 8px;
  ${media.tablet} {
    aspect-ratio: 288/192;
  }
`;

const Bid = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DescriptionArea = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 4.5em;
  color: ${colors.gray7};
`;

export default AuctionCard;
