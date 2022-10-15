import styled from 'styled-components';

interface Props {
  errorMessage?: string;
}

function ErrorMessage({ errorMessage }: Props) {
  return <>{errorMessage ? <StyledErrorMessage>{errorMessage}</StyledErrorMessage> : null}</>;
}

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;

export default ErrorMessage;
