import { media } from '@/lib/media';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import FooterTabItem from './FooterTabItem';

function MobileBottomNavigation() {
  const [user] = useAtom(userAtom);
  return (
    <StyledFooter>
      <FooterTabItem icon="home" exact href="/" />
      {user ? <FooterTabItem icon="notification" exact href="/notification" /> : ''}
      <FooterTabItem icon="add" href="/add" />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid #eaeaea;
  height: 48px;
  ${media.mobile} {
    display: none;
  }
`;

export default MobileBottomNavigation;
