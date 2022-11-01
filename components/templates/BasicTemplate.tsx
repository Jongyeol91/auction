import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import FullHeightPage from '../common/FullHeightPage';
import HeaderBackButton from '../base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';

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
  flex: 1;
`;

export default BasicTemplete;
