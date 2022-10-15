import Input, { type Props as InputProps } from './Input';
import styled, { css } from 'styled-components';
import { forwardRef, useState } from 'react';
import { colors } from '@/lib/colors';
import DateField from './DatePicker';

interface Props extends InputProps {
  label: string;
  control: any;
}

const LabelDatePicker = ({ label, ...rest }: Props) => {
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
      <DateField {...rest} onFocus={onFocus} onBlur={onBlur} />
    </Wrapper>
  );
};

LabelDatePicker.displayName = 'LabelDatePicker';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export default LabelDatePicker;
