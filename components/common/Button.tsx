import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import buttonTheme, { sizeStyles } from '@/lib/buttonTheme';
import { colors } from '@/lib/colors';

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth';
  buttonTheme?: unknown; // Todo: 개선 필요
  styleType?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'medium' | 'small';
  isSelected?: boolean;
}

interface Props extends HTMLAttributes<HTMLButtonElement>, ButtonProps {}

function Button({
  layoutMode = 'inline',
  type,
  size = 'medium',
  styleType = 'primary',
  isSelected,
  ...rest
}: Props) {
  return (
    <StyledButton
      type={type}
      buttonTheme={buttonTheme}
      styleType={styleType}
      size={size}
      layoutMode={layoutMode}
      isSelected={isSelected}
      {...rest}
    />
  );
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.3px;
  transition: filter 0.25s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${({ buttonTheme, styleType }) => buttonTheme[styleType]};
  ${({ size }) => sizeStyles[size!]};
  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
      display: inline-block;
    `}
  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${colors.tertiary};
    `}

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export default Button;
