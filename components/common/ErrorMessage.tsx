import styled from 'styled-components';

interface Props {
  errorMessage?: string | false;
}

function ErrorMessage({ errorMessage }: Props) {
  return <>{errorMessage ? <StyledErrorMessage>{errorMessage}</StyledErrorMessage> : null}</>;
}

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  letter-spacing: -0.3px;
`;

export default ErrorMessage;
