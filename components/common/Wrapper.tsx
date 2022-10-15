import React from 'react';
import styled from 'styled-components';

/**
 * Form field wrapper
 *
 * @param {*} { children }
 * @returns field wrapper
 */

interface Props {
  children: React.ReactNode;
  marginBottom: string;
  maxWidth: string;
  hidden: boolean;
}

const Wrapper = ({ children, marginBottom = '20px', maxWidth = '100%', hidden = false }: Props) => {
  return (
    <StyledWrapper marginBottom={marginBottom} maxWidth={maxWidth} hidden={hidden}>
      {children}
    </StyledWrapper>
  );
};
Wrapper.displayName = 'Wrapper';

const StyledWrapper = styled.div<{ marginBottom: string; maxWidth: string; hidden: boolean }>`
  margin-bottom: ${(props) => props.marginBottom};
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`;

export default Wrapper;
