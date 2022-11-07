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
  ${media.mobile} {
    justify-content: center;
    width: 460px;
    align-self: center;
  }
`;

const Title = styled.h1``;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

export default AddTemplate;
