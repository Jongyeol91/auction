import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  title: string;
  children: React.ReactNode;
  buttonText: string;
}

function AddTemplate({ children, title, buttonText }: Props) {
  return (
    <StyledForm>
      <Title>{title}</Title>
      <Content>{children}</Content>
      <Button styleType="primary">{buttonText}</Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;

const Title = styled.h2``;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default AddTemplate;
