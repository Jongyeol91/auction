import { css } from 'styled-components';
import { colors } from './colors';

// 공통 버튼 테마

const disabled = css`
  background: ${({ theme }) => theme.gray3};
  color: ${({ theme }) => theme.gray1};
  border: 1px solid ${({ theme }) => theme.gray5};
`;

const cancel = css`
  background: ${colors.gray1};
  color: ${colors.gray9};
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
`;

const primary = css`
  background: ${colors.primary};
  color: ${colors.gray1};
  border: none;
  border-radius: 4px;
  &:hover {
    background: ${colors.hover};
    border: ${colors.hoverBorder};
    color: ${colors.hoverFont};
  }
  &:disabled {
    ${disabled}
  }
`;

const secondary = css`
  background: ${colors.secondary};
  color: ${colors.gray1};
  border: none;
  border-radius: 4px;
  &:hover {
    background: ${colors.hover};
    border: ${colors.hoverBorder};
    color: ${colors.hoverFont};
  }
  &:disabled {
    ${disabled}
  }
`;

const tertiary = css`
  background: ${colors.tertiary};
  color: ${colors.gray1};
  border: none;
  border-radius: 4px;
  &:hover {
    background: ${colors.hover};
    border: ${colors.hoverBorder};
    color: ${colors.hoverFont};
  }
  &:disabled {
    ${disabled}
  }
`;

export const sizeStyles = {
  small: css`
    height: 36px;
    font-size: 14px;
    padding: 0 12px;
  `,
  medium: css`
    min-width: 100px;
    font-size: 12px;
    height: 40px;
    padding: 0 10px;
  `,
};

const buttonTheme = {
  cancel,
  primary,
  secondary,
  tertiary,
};

export default buttonTheme;
