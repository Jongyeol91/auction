import { media } from '@/lib/media';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalFullHeight = createGlobalStyle`
  html, body {
    height: 100%;
  }
`;

interface Props {
  children: React.ReactNode;
}
function AutoHeightPage({ children }: Props) {
  return (
    <>
      <Page>{children}</Page>
      <GlobalFullHeight />
    </>
  );
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${media.mobile} {
    flex: 1;
    height: auto;
    overflow: visible;
  }
`;

export default AutoHeightPage;
