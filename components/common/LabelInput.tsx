import Input, { type Props as InputProps } from './Input';
import styled, { css } from 'styled-components';
import { forwardRef, Ref, useState } from 'react';
import { colors } from '@/lib/colors';
import ErrorMessage from './ErrorMessage';
import { FieldValues, FieldPath } from 'react-hook-form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps {
  label: string;
  errorMessage?: string | false;
}

const LabelInput = forwardRef<HTMLInputElement, Props>(
  <TFieldValues extends FieldValues>(
    { label, errorMessage, defaultValue, ...rest }: Props<TFieldValues>,
    ref: Ref<HTMLInputElement> | undefined,
  ) => {
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
        <Input defaultValue={defaultValue} {...rest} onFocus={onFocus} onBlur={onBlur} ref={ref} />
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
