import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import buttonTheme from '@/lib/buttonTheme';

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth';
  buttonTheme?: unknown; // Todo: 개선 필요
  styleType?: string;
  type?: 'button' | 'submit' | 'reset';
}

interface Props extends HTMLAttributes<HTMLButtonElement>, ButtonProps {}

function Button({ layoutMode = 'inline', type, styleType, ...rest }: Props) {
  return (
    <StyledButton
      type={type}
      buttonTheme={buttonTheme}
      styleType={styleType}
      layoutMode={layoutMode}
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${({ buttonTheme, styleType = 'primary' }) => buttonTheme[styleType]};
  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export default Button;
