import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input } from 'antd';
import { search } from '../slices/Search';
const { Search } = Input;

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75vw;
  padding: 15px;

  .searchInputTitle {
    margin-right: auto;
    font-size: 1rem;
  }

  .ant-input-affix-wrapper {
    font-size: 1.5rem;
  }

  .ant-input-search-large .ant-input-search-button {
    height: 52px;
  }
`;

const SearchInput = ({ children }) => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [params, setParams] = useState({
    q: 'track:', // 검색어
    type: 'track', // track으로 검색
    limit: '3', // 검색결과 3개 노출
    token: token, // 토큰
  });

  // 검색 이벤트
  const onSearch = (value) => {
    const nextParams = {
      ...params,
      q: 'track:' + value, //검색어
    };
    setParams(nextParams);
  };

  useEffect(() => {
    dispatch(search(params)); // 새로운 값을 dispatch한다.
  }, [params]);

  return (
    <SearchInputContainer>
      {children}
      {/* SearchInput 영역 */}
      <Search placeholder="제목을 입력하세요." allowClear enterButton="Search" size="large" onSearch={onSearch} />
    </SearchInputContainer>
  );
};

export default SearchInput;
