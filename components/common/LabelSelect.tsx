import { colors } from '@/lib/colors';
import { Select } from 'antd';
import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ErrorMessage from './ErrorMessage';

const { Option } = Select;

interface Option {
  label: string;
  value: number | string;
}

interface Props {
  label: string;
  errorMessage?: string;
  options: Array<Option>;
}

const LabelSelect = forwardRef(({ label, errorMessage, options, ...field }: Props, ref) => {
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
      <StyledSelect size="large" onFocus={onFocus} onBlur={onBlur} {...field}>
        {options?.map((option) => {
          return (
            <Option key={option.label} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </StyledSelect>
    </Wrapper>
  );
});

LabelSelect.displayName = 'LabelSelect';

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

const StyledSelect = styled(Select)`
  display: 'inline-block';
  min-height: 44px;
  width: 100%;
  border-color: ${colors.gray3};
  border-radius: 4px;
  box-shadow: none;
  &:hover {
    border-color: ${colors.gray3};
  }
  &.ant-select {
    transition: none;
    border-color: ${colors.primary};
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: none;
    border-color: ${colors.primary};
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: ${colors.gray3};
  }
  &.ant-select:not(.ant-select-disabled):hover {
    border-color: ${colors.primary};
    box-shadow: none;
  }
`;

export default LabelSelect;
