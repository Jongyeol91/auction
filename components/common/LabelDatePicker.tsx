import styled, { css } from 'styled-components';
import { Component, forwardRef, Ref, useState } from 'react';
import { colors } from '@/lib/colors';
import { DatePicker, ConfigProvider } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/lib/locale/ko_KR';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import ErrorMessage from './ErrorMessage';
interface Props {
  label: string;
  errorMessage?: string;
}

const LabelDatePicker = forwardRef(
  ({ label, errorMessage, ...field }: Props, ref: Ref<Component<PickerProps<moment.Moment>>>) => {
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
        <ConfigProvider locale={locale}>
          <StyledDatePicker {...field} onFocus={onFocus} onBlur={onBlur} picker="date" ref={ref} />
          <StyledTimePicker
            {...field}
            onFocus={onFocus}
            onBlur={onBlur}
            picker="time"
            format={'HH:mm'}
          />
        </ConfigProvider>
      </Wrapper>
    );
  },
);

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

const Block = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledDatePicker = styled(DatePicker)`
  display: 'inline-block';
  min-height: 44px;
  width: 100%;
  border-color: ${colors.gray3};
  border-radius: 4px;
  box-shadow: none;
  &:hover {
    border-color: ${colors.gray3};
  }
  &.ant-picker {
    transition: none;
  }
  &.ant-picker-focused {
    border-color: ${colors.primary};
  }
`;

const StyledTimePicker = styled(StyledDatePicker)``;

export default LabelDatePicker;
