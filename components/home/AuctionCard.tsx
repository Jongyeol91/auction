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
import Input from '../common/Input';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also O

interface Props {
  auctionContent: AuctionContent;
}

const typeMap = {
  NORMAL: '경매',
  REVERSE: '역경매',
};

const colorMap = {
  NORMAL: 'green',
  REVERSE: 'blue',
};

const timer = (endtime: string): React.ReactNode => {
  const now = dayjs();
  const _endtime = dayjs(endtime);

  const remainMilliseconds = now.diff(_endtime, 'milliseconds') * -1;
  const deadline = Date.now() + remainMilliseconds; // Moment is also O

  let remainHours = now.diff(_endtime, 'hours');
  let remainDays = Math.floor(remainHours / 24);
  remainHours = remainHours - remainDays * 24;
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

function AuctionCard({ auctionContent }: Props) {
  const { auctionItem, auctionImageUrl, hostUser, auctionType, endTime } = auctionContent;
  const { metalName, metalOptionName, amount, price } = auctionItem;

  const [seletced, setSelected] = useState<boolean>(false);

  return (
    <Block>
      {auctionImageUrl ? (
        <Thumbnail src={auctionImageUrl} alt={metalName} onClick={() => setSelected(!seletced)} />
      ) : null}
      <FirstLine>
        <TitleWrapper>
          <Tag color={colorMap[auctionType]}>{typeMap[auctionType]}</Tag>
          <Tag>{metalName}</Tag>
          <Tag>{metalOptionName}</Tag>
        </TitleWrapper>
        <UserWrapper>
          <User />
          {hostUser.personal.name}
        </UserWrapper>
      </FirstLine>
      <TitleWrapper>
        <Tag>{amount + '톤'}</Tag>
        <Tag>{'톤 당 ' + price + '원'}</Tag>
        {timer(endTime)}
        {/* <Tag>{dayjs(endTime).format('YY/MM/DD hh:mm 종료')}</Tag> */}
      </TitleWrapper>
      {seletced && (
        <Bid>
          <Input />
          <Button styleType="secondary">입찰</Button>
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

const Bid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default AuctionCard;
