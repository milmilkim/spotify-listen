import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { search } from '../slices/Search';

import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

  .ant-form {
    display: flex;
    width: 100%;
  }

  .ant-input-affix-wrapper {
    font-size: 1.5rem;
  }

  .ant-btn {
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
  });

  // 검색 이벤트
  const onSearch = useCallback(
    (e) => {
      const nextParams = {
        ...params,
        q: 'track:' + e.target.value, //검색어
        token: token, // 토큰
      };
      setParams(nextParams);
    },
    [params, token],
  );

  // 검색 submit 이벤트
  const onSubmit = useCallback(() => {
    dispatch(search(params)); // 새로운 값을 dispatch한다.
  }, [dispatch, params]);

  return (
    <SearchInputContainer>
      {children}
      {/* SearchInput 영역 */}
      <Form onFinish={onSubmit}>
        <Input
          placeholder="제목을 입력하세요."
          allowClear
          size="large"
          onChange={onSearch}
        />
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          Search
        </Button>
      </Form>
    </SearchInputContainer>
  );
};

export default React.memo(SearchInput);
