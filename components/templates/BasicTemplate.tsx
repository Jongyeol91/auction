import styled from 'styled-components';
import MobileHeader from '../base/MobileHeader';
import FullHeightPage from '../common/FullHeightPage';
import HeaderBackButton from '../base/HeaderBackButton';
import { useGoBack } from '@/hooks/useGoBack';
import TopHeader from '../base/TopHeader';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
  title?: string;
  hasBackButton?: boolean;
  hasLoginButton?: React.ReactNode;
}

function BasicTemplete({ children, title, hasBackButton, hasLoginButton }: Props) {
  const goBack = useGoBack();
  const router = useRouter();
  return (
    <FullHeightPage>
      <TopHeader />
      <MobileHeader
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={goBack} /> : undefined}
        headerRight={
          hasLoginButton ? <UserOutlined onClick={() => router.push('/register')} /> : undefined
        }
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
