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
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Title = styled.h1``;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default AddTemplate;
