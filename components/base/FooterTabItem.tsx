import styled, { css } from 'styled-components';
import BulletList from '@/components/vectors/BulletList.svg';
import Search from '@/components/vectors/Search.svg';
import React from 'react';
import { colors } from '@/lib/colors';

const IconMap = {
  home: <BulletList />,
  search: <Search />,
};

interface Props {
  icon: keyof typeof IconMap;
  isActive?: boolean;
}

function FooterTabItem({ icon, isActive }: Props) {
  return <Item isActive={isActive}>{IconMap[icon]}</Item>;
}

const Item = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${colors.primary};
    `};
`;

export default FooterTabItem;
