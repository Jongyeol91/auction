import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import FullHeightPage from '../common/FullHeightPage';
import HeaderBackButton from '../base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';
import TopHeader from '../base/TopHeader';

interface Props {
  children?: React.ReactNode;
  title?: string;
  hasBackButton?: boolean;
  headerRight?: string;
}

function BasicTemplete({ children, title, hasBackButton, headerRight }: Props) {
  const goBack = useGoBack();
  return (
    <FullHeightPage>
      <TopHeader />
      <MobileHeader
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={goBack} /> : undefined}
        headerRight={headerRight}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  );
}

const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
`;

export default BasicTemplete;
