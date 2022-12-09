import React, { useState } from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { media } from '@/lib/media';

/**
 *
 * @param name
 * @param fileName
 * @param label
 * @param methods
 * @param required
 * @param width
 * @param height
 * @returns {JSX.Element}
 * @constructor
 */
const ThumbnailUploadField = ({
  fileName,
  disabled,
  deleteFile,
  deletable = false,
  methods,
  required = false,
  width = '70%',
  height = '300px',
}) => {
  const rules = { required: required };
  const { control, setValue } = methods;
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('jpeg 혹은 png 형식의 파일을 올려주세요.');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('파일 크기가 2MB를 초과화였습니다.');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    setValue(fileName, img); // hook form v7 point!

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onDeleteButtonClick = () => {
    if (url && deleteFile) {
      deleteFile();
    }
    setValue(fileName, null);
    setUrl(null);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>업로드</div>
    </div>
  );

  return (
    <Wrapper>
      <Controller
        name={fileName}
        className="avatar-uploader"
        control={control}
        rules={rules}
        render={({ ...field }) => {
          return (
            <StyledUpload
              accept="image/*"
              width={width}
              height={height}
              listType="picture-card"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              showUploadList={false}
              disabled={disabled}
              {...field}
            >
              {imageUrl ? (
                <StyledImg src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </StyledUpload>
          );
        }}
      />
    </Wrapper>
  );
};

const StyledUpload = styled(Upload)`
  display: 'inline-block';
  min-height: 36px;
  width: 100%;

  & > .ant-upload {
    width: 200px;
    height: 130px;
    ${media.tablet} {
      width: ${(props) => props.width};
      height: ${(props) => props.height};
    }
  }
`;

const StyledImg = styled.img`
  width: 100%;
  aspect-ratio: 288/192;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.125);
  display: block;
  ${media.tablet} {
    aspect-ratio: 288/192;
  }
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > button {
    border: none;
  }
`;

export default ThumbnailUploadField;
