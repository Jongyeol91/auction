import AddTemplate from '@/components/add/AddTemplate';
import LabelInput from '@/components/common/LabelInput';
import LabelTextArea from '@/components/common/LableTextArea';
import TabTamplete from '@/components/templates/TabTemplate';
import styled from 'styled-components';

function Add() {
  return (
    <TabTamplete>
      <AddTemplate title="경매" buttonText="다음">
        <Group>
          <LabelInput label="카테고리" />
          <LabelInput label="서브 카테고리" />
          <StyledLabelTextArea label="서브 카테고리" />
        </Group>
      </AddTemplate>
    </TabTamplete>
  );
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`;

const StyledLabelTextArea = styled(LabelTextArea)`
  display: flex;
  flex: 1;
  textarea {
    flex: 1;
  }
`;

export default Add;