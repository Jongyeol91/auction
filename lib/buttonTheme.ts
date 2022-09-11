import { css } from 'styled-components';

// 공통 버튼 테마

const disabled = css`
  background: ${({ theme }) => theme.gray1};
  color: ${({ theme }) => theme.gray9};
  border: 1px solid ${({ theme }) => theme.gray5};
`;

const primary = css`
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  border: none;
  height: 40px;
  &:hover {
    background: ${({ theme }) => theme.gray1};
  }
  &:disabled {
    ${disabled}
  }
`;

const buttonTheme = {
  primary,
};

export default buttonTheme;
