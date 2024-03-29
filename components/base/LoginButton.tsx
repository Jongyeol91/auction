import ArrowLeft from '@/components/vectors/ArrowLeft';
import { colors } from '@/lib/colors';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  onClick?: () => void;
}

function LoginButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <UserOutlined />
    </IconButton>
  );
}

// 버튼 클릭 영역을 더 넓게 가져가기 위해 버튼으로 svg 감싸고 padding 과 -margin 으로 더 넓게 영역 설정
const IconButton = styled.button`
  background: none;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`;

export default LoginButton;
