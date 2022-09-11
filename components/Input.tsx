import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';

export type Props = React.HtmlHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  return <StyledInput {...props} ref={ref} />;
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

export default Input;
