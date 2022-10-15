import React from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import styled from 'styled-components';

import 'moment/locale/ko';
import locale from 'antd/lib/locale/ko_KR';
import { colors } from '@/lib/colors';
import { Moment } from 'moment';

/**
 * Date field for form
 *
 * @param {*} props
 * @returns date field
 */

// interface Props {
//   defaultValue?: Moment;
//   disabled: boolean;
//   name: string;
//   error: boolean;
//   control:
// }

const DateField = (props) => {
  const {
    className,
    defaultValue = false,
    disabled = false,
    id,
    error = false,
    control,
    required,
    disabledDate,
    onFocus,
    onBlur,
  } = props;

  const borderColor = error ? '#EF3340' : colors.gray3;

  const rules = { required: required };

  return (
    <ConfigProvider locale={locale}>
      <Controller
        name={id}
        className={className}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ ...field }: ControllerRenderProps) => {
          return (
            <StyledDatePicker
              {...field}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              borderColor={borderColor}
              disabledDate={disabledDate}
            />
          );
        }}
      />
    </ConfigProvider>
  );
};

const StyledDatePicker = styled(DatePicker)<{ borderColor: string }>`
  display: 'inline-block';
  min-height: 44px;
  width: 100%;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 4px;
  box-shadow: none;
  &:hover {
    border-color: ${({ borderColor }) => borderColor};
  }
  &.ant-picker {
    transition: none;
  }
  &.ant-picker-focused {
    border-color: ${colors.primary};
  }
`;

export default DateField;
