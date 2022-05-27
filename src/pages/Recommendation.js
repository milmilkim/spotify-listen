import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReco } from '../slices/RecommendationSlice';
import styled from 'styled-components';

import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const Recommendation = memo(() => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.recommendation);
  const { token } = useSelector((state) => state.token);

  // useEffect(() => {
  //   dispatch(
  //     getReco({
  //       token,
  //       seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
  //       seed_genres: 'classical,country',
  //       seed_tracks: '0c6xIDDpzE81m2q797ordA',
  //       min_energy: 0.5,
  //       min_loudness: 0.5,
  //       min_danceability: 0.5,
  //       min_valence: 0.5,
  //     })
  //   );

  //   console.log(data);
  // }, [token]);

  return (
    <div>
      <Space size="large">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />

        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </Space>
    </div>
  );
});

export default Recommendation;
