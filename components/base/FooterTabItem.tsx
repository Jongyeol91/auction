import styled, { css } from 'styled-components';
import BulletList from '@/components/vectors/BulletList.svg';
import Search from '@/components/vectors/Search.svg';
import Add from '@/components/vectors/Add.svg';
import Notification from '@/components/vectors/Notification.svg';
import Auction from '@/components/vectors/Auction.svg';
import React, { useMemo } from 'react';
import { colors } from '@/lib/colors';
import { useRouter } from 'next/router';
import Link from 'next/link';

const IconMap = {
  home: <BulletList />,
  search: <Search />,
  add: <Add />,
  notification: <Notification />,
  hosting: <Auction />,
};

interface Props {
  icon: keyof typeof IconMap;
  href: string;
  exact?: boolean;
}

function FooterTabItem({ icon, href, exact }: Props) {
  const { pathname } = useRouter();

  const isActive = useMemo(
    () => (exact ? pathname === href : pathname.startsWith(href)),
    [exact, href, pathname],
  );

  return (
    <Link href={href}>
      <Item isActive={isActive}>{IconMap[icon]}</Item>
    </Link>
  );
}

const Item = styled.a<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: ${colors.gray6};
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${colors.primary};
    `};
`;

export default FooterTabItem;
