import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, setToken } from './slices/TokenSlice';

import { getAudioFeatures } from './slices/AudioFeaturesSlice';
import { getTracks } from './slices/TracksSlice';
import { Link } from 'react-router-dom';

const Test = memo(() => {
  const { isLogin, token, isLoading } = useSelector((state) => state.token);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleTokenButton = (e) => {
    dispatch(getToken());
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOnKeyUp = (e) => {
    if (e.key === 'Enter') {
      dispatch(setToken(text));
    }
  };

  // 새 토큰 발급버튼을 클릭하면 정상적으로 데이터를 가져오는지 테스트
  const { data: aData } = useSelector((state) => state.audioFeatures);
  const { data: tData } = useSelector((state) => state.tracks);
  useEffect(() => {
    /**
    token &&
      dispatch(
        getAudioFeatures({
          ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
          token,
        }),
      );
    /*/
    token &&
      dispatch(
        getTracks({
          id: '11dFghVXANMlKmJXsNCbNl',
          token,
        })
      );
    /**/
  }, [dispatch, token]);
  console.log(aData);
  console.log(tData);

  return (
    <div>
      <h1>토큰 테스트</h1>
      <button onClick={handleTokenButton}>새 토큰발급</button>
      <br />
      토큰값 설정(엔터): <input type="text" onKeyUp={handleOnKeyUp} onChange={handleChange} />
      {isLoading ? (
        <>loading...</>
      ) : (
        <ul>
          <li>로그인 여부: {isLogin.toString()}</li>
          <li>저장된 토큰: {!!token ? <>{token}</> : '토큰 없음'}</li>
          <Link to="/recommend">추천</Link>
          <Link to="/search">검색</Link>
        </ul>
      )}
    </div>
  );
});

export default Test;
