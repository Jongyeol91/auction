import { colors } from '@/lib/colors';
import { Empty } from 'antd';
import exp from 'constants';
import styled from 'styled-components';

interface Props {
  description: string | React.ReactNode;
}

function EmptyPage({ description }: Props) {
  return (
    <Wrapper>
      <Empty description={<StyledSpan>{description}</StyledSpan>} />
    </Wrapper>
  );
}

const StyledSpan = styled.span`
  color: ${colors.gray5};
`;

const Wrapper = styled.div`
  padding: 80px 0;
`;

export default EmptyPage;
