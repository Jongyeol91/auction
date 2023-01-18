/** ...rest가 styledTextArea로만 가고 있어서 외부에서 사이즈 조절을 해도 Wrapper의 사이즈가 계속 고정이 되어 있었음 그래서 className을 따로 wrapper에도 추가해줌 */

import styled, { css } from 'styled-components';
import { forwardRef, useState } from 'react';
import { colors } from '@/lib/colors';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const LabelTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, className, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false);

    const onFocus = () => {
      setFocused(true);
    };

    const onBlur = () => {
      setFocused(false);
    };

    return (
      <Wrapper className={className}>
        <Label focused={focused}>{label}</Label>
        <StyledTextArea {...rest} onFocus={onFocus} onBlur={onBlur} ref={ref} />
      </Wrapper>
    );
  },
);

LabelTextArea.displayName = 'LabelTextArea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<{ focused: boolean }>`
  line-height: 1.5;
  font-size: 16px;
  letter-spacing: -0.3px;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`;

const StyledTextArea = styled.textarea`
  border-radius: 4px;
  border: 1px solid ${colors.gray3};
  color: ${colors.gray5};
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  font-family: inherit;
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
`;

export default LabelTextArea;
