//
// Copyright 2021 Lemonade
//

import React, { useState } from 'react';
import _ from 'lodash';

import ThumbnailUploadField from '@/components/common/ThumbnailUploadField';
import styled, { css } from 'styled-components';
import { colors } from '@/lib/colors';

const Field = ({
  label,
  fileName,
  name,
  type,
  control,
  errors,
  errorMessage,
  required = false,
  placeholder,
  defaultValue = null,
  ...leftProps
}) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };
  let ReturnField = ThumbnailUploadField;

  switch (type) {
    case 'imageUpload':
      ReturnField = ThumbnailUploadField;
      break;
  }

  const getInputType = (type) => {
    switch (type) {
      case 'hidden':
        return { type: 'hidden' };
      default:
        return {};
    }
  };

  const error = _.get(errors, name);

  const getErrorMessage = () => {
    // 에러메시지가 입력 된 경우 에러메시지로 반환
    if (errorMessage) {
      return errorMessage;
    }

    // 에러내에 에러메시지가 있을 경우 에러메시지로 반환
    if (error?.message) {
      return error.message;
    }

    // 에러 메시지 및 에러안에 메시지가 지정이 안되어있을 경우 기본 메시지 입력
    const errorType = error?.type;
    let defaultErrorMessage;

    switch (errorType) {
      case 'required': {
        defaultErrorMessage = '필수항목';
        break;
      }
    }

    return defaultErrorMessage;
  };

  return (
    <>
      <Label focused={focused}>{label}</Label>
      <ReturnField
        fileName={fileName}
        name={name}
        control={control}
        required={required}
        error={error}
        errorMessage={getErrorMessage()}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        {...leftProps}
        {...getInputType(type)}
      />
    </>
  );
};

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

export default Field;
