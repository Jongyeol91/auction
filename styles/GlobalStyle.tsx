import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard-Medium';
  src: url('/fonts/Pretendard-Medium.ttf') format('truetype');
}
  body: {
    font-family: "Pretendard-Medium", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background: red;
  }
`;

export default GlobalStyle;
