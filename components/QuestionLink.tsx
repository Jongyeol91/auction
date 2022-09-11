import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../lib/colors';

interface Props {
  question: string;
  name: string;
  href: string;
  className?: string;
}

function QuestionLink({ question, name, href, className }: Props) {
  return (
    <Wrapper className={className}>
      {question} <Link href={href}>{name}</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${colors.gray3};
  a {
    font-weight: 600;
    color: ${colors.gray5};
  }
`;

export default QuestionLink;
