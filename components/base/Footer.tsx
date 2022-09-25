import styled from 'styled-components';
import FooterTabItem from './FooterTabItem';

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="home" exact href="/" />
      <FooterTabItem icon="search" href="/search" />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid #eaeaea;
  height: 48px;
`;

export default Footer;
