import { media } from '@/lib/media';
import styled from 'styled-components';
import FooterTabItem from './FooterTabItem';

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="home" exact href="/" />
      <FooterTabItem icon="search" href="/search" />
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

export default Footer;
