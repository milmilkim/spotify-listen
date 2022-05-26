import React, { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, setIsLogin, setToken } from './slices/TokenSlice';

const Test = memo(() => {
  const { isLogin, token, isLoading } = useSelector((state) => state.token);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleTokenButton = (e) => {
    dispatch(getToken());
  };

  const handleLoginButton = useCallback(
    (e) => {
      dispatch(setIsLogin(!isLogin));
    },
    [isLogin, dispatch]
  );

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnKeyUp = (e) => {
    if (e.key === 'Enter') {
      dispatch(setToken(text));
    }
  };
  return (
    <div>
      <h1>토큰 테스트</h1>
      <button onClick={handleTokenButton}>새 토큰발급</button>
      {isLogin ? <button onClick={handleLoginButton}>로그아웃</button> : <button onClick={handleLoginButton}>로그인</button>}
      <br />
      토큰값 설정(엔터): <input type="text" onKeyUp={handleOnKeyUp} onChange={handleChange} />
      {isLoading ? (
        <>loading...</>
      ) : (
        <ul>
          <li>로그인 여부: {isLogin.toString()}</li>
          <li>저장된 토큰: {!!token ? <>{token}</> : '토큰 없음'}</li>
        </ul>
      )}
    </div>
  );
});

export default Test;
