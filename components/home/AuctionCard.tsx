import { type AuctionContent } from '@/lib/api/types';
import { colors } from '@/lib/colors';
import styled from 'styled-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { media } from '@/lib/media';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import { Statistic } from 'antd';
import { bid } from '@/lib/api/auctions';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Weight from '@/components/vectors/Weight.svg';
import Metal from '@/components/vectors/Metal.svg';
import MoneyWon from '@/components/vectors/MoneyWon.svg';
import { AUCTION_TYPE, AUCTION_STATUS_MAP } from '@/lib/constants';
import LabelInput from '../common/LabelInput';

const { Countdown } = Statistic;

interface Props {
  auctionContent: AuctionContent;
  forbidden?: boolean;
}

const auctionTypeColorMap = {
  NORMAL: 'green',
  REVERSE: 'blue',
};

const timer = (endtime: string, auctionStatusType: string): React.ReactNode => {
  if(auctionStatusType != 'ACTIVE') {
    return (
        <>
          <Countdown
              value={Date.now()}
              valueStyle={{ fontSize: 12, color: 'red' }}
              format="D일 HH시간 mm분 ss초"
          ></Countdown>
        </>
    );
  }

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
      <Countdown
        value={deadline}
        valueStyle={{ fontSize: 12, color: imminent ? 'red' : 'black' }}
        format="D일 HH시간 mm분 ss초"
      ></Countdown>
    </>
  );
};

function AuctionCard({ auctionContent, forbidden }: Props) {
  const { id, auctionItem, auctionImageUrl, auctionType, endTime, description, auctionStatusType } =
    auctionContent;

  const { amount, price } = auctionItem;
  const metalName = auctionItem?.metal?.name;

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

  const onClickCard = () => {
    if (auctionStatusType !== 'ACTIVE' && !forbidden) {
      Swal.fire('입찰불가', `${AUCTION_STATUS_MAP[auctionStatusType]}된 경매입니다.`, 'error');
    }
    setSelected(!seletced);
  };

  const statusTag = () => {
    const statusText = AUCTION_STATUS_MAP[auctionStatusType];
    if (auctionStatusType == 'ACTIVE') {
      return <Tag color={colors.primary}>{statusText}</Tag>;
    }

    return <Tag>{statusText}</Tag>;
  };

  const inputPriceFormat = (str: string) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  return (
    <Block>
      {auctionImageUrl ? (
        <Thumbnail src={auctionImageUrl} alt={metalName} onClick={() => onClickCard()} />
      ) : null}
      <FirstLine>
        <TitleWrapper>
          <TypeWrapper>
            {statusTag()}
            <Tag color={auctionTypeColorMap[auctionType]}>{AUCTION_TYPE[auctionType]}</Tag>
          </TypeWrapper>
          <>{timer(endTime, auctionStatusType)}</>
        </TitleWrapper>
      </FirstLine>
      <InfoWrapper>
        <IconWrapper>
          <Metal />
          <span>{metalName}</span>
        </IconWrapper>
        <IconWrapper>
          <Weight />
          <span>{amount + '톤'}</span>
        </IconWrapper>
        <IconWrapper>
          <MoneyWon />
          <span>{'톤 당 ' + inputPriceFormat(price) + '원'}</span>
        </IconWrapper>
        <IconWrapper>
          <MoneyWon />
          <span>{'총 ' + inputPriceFormat((amount * price)) + '원'}</span>
        </IconWrapper>

        {/* <Tag>{dayjs(endTime).format('YY/MM/DD hh:mm 종료')}</Tag> */}
      </InfoWrapper>
      <DescriptionArea>{description}</DescriptionArea>
      {seletced && auctionStatusType === 'ACTIVE' && !forbidden && (
        <Bid onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            type="number"
            min={1}
            placeholder="입찰 금액을 입력하세요"
            {...register('price', { required: '필수 입력' })}
          />
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

const StyledInput = styled(LabelInput)`
  padding: 8px;
  margin-right: 8px;
  width: 100%;
  height: auto;
  border: 1px solid ${colors.gray5};
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  justify-content: space-between;
  h3 {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray6};
    margin: 0;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const TypeWrapper = styled.div``;

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
  cursor: pointer;
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
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 4.5em;
  color: ${colors.gray7};
`;

const IconWrapper = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 14px;
  gap: 4px;
  cursor: pointer;
  svg {
    width: 16px;
    color: ${colors.gray9};
  }
  span {
    display: flex;
    justify-content: center;
    color: ${colors.gray9};
    font-size: 14px;
    margin: 0;
  }
`;

export default AuctionCard;
