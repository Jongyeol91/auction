import React from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';
import { media } from '@/lib/media';

// Todo: svg 컴포넌트 로고로 바꿀 경우 React.ReactNode 로 타입 바꾸기
interface Props {
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: string;
}

function MobileHeader({ title = 'EMETAL', headerLeft, headerRight }: Props) {
  return (
    <Block>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">right</HeaderSide>}
    </Block>
  );
}

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position} : 16px;
  display: flex;
  align-items: center;
  right: 16px;
  top: 0;
  height: 100%;
`;

const Block = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.gray3};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    display: none;
  }
`;

const Title = styled.div`
  color: ${colors.gray7};
  font-weight: 600;
`;

export default MobileHeader;
