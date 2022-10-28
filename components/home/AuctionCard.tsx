import { type AuctionContent } from '@/lib/api/types';
import { colors } from '@/lib/colors';
import styled from 'styled-components';
import User from '@/components/vectors/User.svg';
import { Tag } from 'antd';
import dayjs from 'dayjs';

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
  const _endtime = dayjs(endtime);
  const now = dayjs();

  let remainHours = now.diff(_endtime, 'hours');
  let remainDays = Math.floor(remainHours / 24);
  remainHours = remainHours - remainDays * 24;
  remainDays *= -1;

  const imminent = remainDays < 7;
  return (
    <Tag color={imminent ? 'error' : ''}>{remainDays + '일 ' + remainHours + '시간 남음'}</Tag>
  );
};

function AuctionCard({ auctionContent }: Props) {
  const { auctionItem, auctionImageUrl, hostUser, auctionType, endTime } = auctionContent;
  const { metalName, metalOptionName, amount, price } = auctionItem;

  return (
    <Block>
      {auctionImageUrl ? <Thumbnail src={auctionImageUrl} alt={metalName} /> : null}
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
`;

export default AuctionCard;
