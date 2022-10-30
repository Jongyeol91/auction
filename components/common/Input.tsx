import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';

export interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  type?:
    | 'number'
    | 'button'
    | 'time'
    | 'image'
    | 'text'
    | 'search'
    | 'hidden'
    | 'color'
    | 'checkbox'
    | 'radio'
    | 'tel'
    | 'url'
    | 'email'
    | 'submit';
}

const Input = forwardRef<HTMLInputElement, Props>(({ ...rest }: Props, ref) => {
  return (
    <>
      <StyledInput {...rest} ref={ref} />
    </>
  );
});

Input.displayName = 'Input';

const StyledInput = styled.input`
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${colors.gray3};
  color: ${colors.gray5};
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
`;

export default Input;
