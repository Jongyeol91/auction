import Input, { type Props as InputProps } from './Input';
import styled, { css } from 'styled-components';
import { forwardRef, useState } from 'react';
import { colors } from '@/lib/colors';
import ErrorMessage from './ErrorMessage';

interface Props extends InputProps {
  label: string;
  errorMessage?: string;
}

const LabelInput = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false);

    const onFocus = () => {
      setFocused(true);
    };

    const onBlur = () => {
      setFocused(false);
    };

    return (
      <Wrapper>
        <Block>
          <Label focused={focused}>{label}</Label>
          <ErrorMessage errorMessage={errorMessage} />
        </Block>
        <Input {...rest} onFocus={onFocus} onBlur={onBlur} ref={ref} />
      </Wrapper>
    );
  },
);

LabelInput.displayName = 'LabelInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Block = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
