import styled from 'styled-components';
import FooterTabItem from './FooterTabItem';

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="home" />
      <FooterTabItem icon="search" isActive />
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
