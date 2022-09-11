import Input, { type Props as InputProps } from './Input';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { colors } from '@/lib/colors';

interface Props extends InputProps {
  label: string;
}

function LabelInput({ label, ...rest }: Props) {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <Wrapper>
      <Label focused={focused}>{label}</Label>
      <Input onFocus={onFocus} onBlur={onBlur} {...rest} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & + & {
    margin-top: 16px;
  }
`;

const Label = styled.label<{ focused: boolean }>`
  line-height: 1.5;
  font-size: 16px;
  letter-spacing: -0.3px;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`;

export default LabelInput;
