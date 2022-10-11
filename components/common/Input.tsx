import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';

export interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(({ errorMessage, ...rest }: Props, ref) => {
  return (
    <>
      <StyledInput {...rest} ref={ref} />
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
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
    border: 1px solid gold;
  }
  &::placeholder {
    color: ${colors.gray2};
  }
`;
const ErrorMessage = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
`;
export default Input;
