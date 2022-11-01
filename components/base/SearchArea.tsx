import { colors } from '@/lib/colors';
import styled from 'styled-components';
import Search from 'components/vectors/Search.svg';

function SearchArea() {
  return (
    <Block>
      <SearchInputWrapper>
        <Search />
        <input />
      </SearchInputWrapper>
    </Block>
  );
}

export default SearchArea;

const Block = styled.div``;

const SearchInputWrapper = styled.div`
  height: 36px;
  padding: 0 14px 0 8px;
  border-radius: 4px;
  border: 1px solid ${colors.gray2};
  display: flex;
  align-items: center;
  width: 180px;
  margin-right: 8px;
  & > svg {
    width: 20px;
    height: 20px;
    color: ${colors.gray4};
    margin-right: 8px;
    flex-shrink: 0;
  }
  input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 0;
  }
`;
