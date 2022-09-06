import React from 'react';
import styled from 'styled-components';
import { colors } from '../lib/colors';

interface Props {
  title?: string; // Todo svg 컴포넌트 로고로 바꿀 경우 React.ReactNode 로 타입 바꾸기
}

function Header({ title = 'emetal' }: Props) {
  return (
    <Block>
      <Title>{title}</Title>
    </Block>
  );
}

const Block = styled.header`
  height: 56px;
  border-bottom: 1px solid ${colors.gray3};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: ${colors.gray3};
  font-weight: 600;
`;

export default Header;
