import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import styled from 'styled-components';
import Link from 'next/link';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { getStroageItem, removeStorageItem } from '@/lib/local-storage';
import Notification from '@/components/vectors/Notification.svg';
import SquarePlus from '@/components/vectors/SquarePlus.svg';
import MyAuction from '@/components/vectors/MyAuction.svg';
import Chart from '@/components/vectors/Chart.svg';
import Auction from '@/components/vectors/Auction.svg';

function Header() {
  return (
    <Block>
      <Content>
        <Addon></Addon>
        <Addon>
          {/* <SearchArea /> */}
          <Buttons>
            {getStroageItem('accessToken') && (
              <>
                <Link href="notification">
                  <IconWrapper>
                    <Notification />
                    <span>알림</span>
                  </IconWrapper>
                </Link>
                <Link href="add">
                  <IconWrapper>
                    <SquarePlus />
                    <span>경매 생성</span>
                  </IconWrapper>
                </Link>
                <Link href="hosting">
                  <IconWrapper>
                    <Auction />
                    <span>내경매</span>
                  </IconWrapper>
                </Link>
              </>
            )}
            <Link href="chart">
              <IconWrapper>
                <Chart />
                <span>시세</span>
              </IconWrapper>
            </Link>
            {!getStroageItem('accessToken') ? (
              <></>
            ) : (
              <>
                <Link href="register">
                  <IconWrapper>
                    <MyAuction />
                    <span>내정보</span>
                  </IconWrapper>
                </Link>
              </>
            )}
          </Buttons>
        </Addon>
      </Content>
    </Block>
  );
}

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding: 0;
  line-height: 14px;
  cursor: pointer;
  svg {
    margin-bottom: 4px;
    color: ${colors.gray9};
  }
  span {
    display: flex;
    justify-content: center;
    width: 48px;
    color: ${colors.gray9};
    font-size: 12px;
    margin: 0;
  }
`;

const Block = styled.div`
  background: ${colors.white};
  position: relative;
  height: 72px;
  border-bottom: 0.5px solid ${colors.gray3};
  padding: 0 16px;
  display: none;
  align-items: center;
  ${media.mobile} {
    display: flex;
  }
`;

// const StyledLogo = styled(Logo)`
//   height: 32px;
//   width: auto;
// `;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Addon = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`;

export default Header;
