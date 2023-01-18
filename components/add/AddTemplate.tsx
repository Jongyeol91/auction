import { colors } from '@/lib/colors';
import { media } from '@/lib/media';
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
interface Props {
  title: string;
  children?: React.ReactNode;
  buttonText: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
}

function AddTemplate({ children, title, buttonText, handleSubmit, onSubmit }: Props) {
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{title}</Title>
      <Content>{children}</Content>
      <Button styleType="primary">{buttonText}</Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
  ${media.mobile} {
    flex: 1;
    justify-content: center;
    width: 460px;
    align-self: center;
  }
  ${media.desktop} {
    flex: 1;
    justify-content: center;
    width: 640px;
    align-self: center;
  }
  h3 {
    color: ${colors.gray5};
    line-height: 1.5;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
`;

const Title = styled.h1``;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  ${media.mobile} {
    flex: initial;
    padding-bottom: 24px;
  }
`;

export default AddTemplate;
