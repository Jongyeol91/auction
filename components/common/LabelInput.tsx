import Input, { type Props as InputProps } from './Input';
import styled, { css } from 'styled-components';
import { forwardRef, useState } from 'react';
import { colors } from '@/lib/colors';

interface Props extends InputProps {
  label: string;
}

const LabelInput = forwardRef<HTMLInputElement, Props>(({ label, ...rest }: Props, ref) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    console.log(2);
    setFocused(false);
  };

  return (
    <Wrapper>
      <Label focused={focused}>{label}</Label>
      <Input {...rest} onFocus={onFocus} onBlur={onBlur} ref={ref} />
    </Wrapper>
  );
});

LabelInput.displayName = 'LabelInput';

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
