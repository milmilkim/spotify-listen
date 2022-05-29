import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Space, Row, Col, Radio, Divider, Slider, Button, Alert } from 'antd';

import styled from 'styled-components';
import axios from 'axios';

import SearchModal from '../components/SearchModal';

const { Search } = Input;

const StyledDivider = styled(Divider)`
  span {
    font-weight: bolder;
    font-size: 22px;
  }
`;

const Recommend = memo(() => {
  const { token } = useSelector((state) => state.token);

  const [genres, setGenres] = useState([]);
  const [params, setParams] = useState({
    token: token,
    /* 기본값 */
    seed_artists: '6RHTUrRF63xao58xh9FXYJ', //아이브
    seed_tracks: '0Q5VnK2DYzRyfqQRJuUtvi', //러브 다이브 (그냥 내가 좋아해서)
    seed_genres: genres,
    energy: 0.5,
    loudness: 0.5,
    danceability: 0.5,
    valence: 0.5,
  });

  const [search, setSearch] = useState({
    query: '',
    title: '',
    artist: '',
  });

  const [visible, setVisible] = useState(false);

  const onSearchTitle = (query) => {
    setVisible(true);
    setSearch({
      ...search,
      query: 'track:' + query,
    });
  };

  const handleSlider = (value, name) => {
    const nextParams = {
      ...params,
      [name]: value / 100, //100으로 나눠서 0이상 1이하의 값으로 바꿈
    };

    setParams(nextParams);
  };

  const handleChange = (e) => {
    const nextParams = {
      ...params,
      [e.target.name]: e.target.value,
    };

    setParams(nextParams);
  };

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      navigate('/recommend_result', { state: params });
    },
    [params, navigate]
  );

  useEffect(() => {
    if (token) {
      (async () => {
        let res = null;
        try {
          res = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGenres(res.data.genres);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [token]);

  return (
    <>
      <Row style={{ justifyContent: 'space-between', width: '75vw', margin: 'auto' }} align="middle">
        <Col span={15} style={{ position: 'relative' }}>
          {/* 왼쪽 */}
          <StyledDivider orientation="left" orientationMargin="0">
            트랙
          </StyledDivider>
          <Row>
            <Space size="large">
              <Search
                id="title"
                placeholder="제목"
                onSearch={onSearchTitle}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Row>
          <Row>
            <Alert message={`${search.title}/${search.artist}`} type="info" style={{ marginTop: '20px' }} />
          </Row>
          <Row>
            <StyledDivider orientation="left" orientationMargin="0">
              선호장르
            </StyledDivider>
            <Radio.Group name="genres" options={genres} optionType="button" onChange={handleChange} defaultValue="k-pop" />
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            <Button type="primary" size="large" style={{ marginTop: '20px' }} onClick={onSubmit}>
              추천 검색
            </Button>
          </Row>
        </Col>
        <Col span={9}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ display: 'inline-block', height: '300px' }}>
              <Slider
                vertical
                defaultValue={50}
                name="energy"
                onChange={(e) => {
                  handleSlider(e, 'energy');
                }}
              />
            </div>
            <div style={{ display: 'inline-block' }}>
              <Slider
                vertical
                defaultValue={50}
                onChange={(e) => {
                  handleSlider(e, 'liveness');
                }}
              />
            </div>
            <div style={{ display: 'inline-block', height: '300px' }}>
              <Slider
                vertical
                defaultValue={50}
                onChange={(e) => {
                  handleSlider(e, 'danceability');
                }}
              />
            </div>
            <div style={{ display: 'inline-block', height: '300px' }}>
              <Slider
                vertical
                defaultValue={50}
                onChange={(e) => {
                  handleSlider(e, 'valence');
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ width: '25%', textAlign: 'center' }}>energy</span>
            <span style={{ width: '25%', textAlign: 'center' }}>liveness</span>
            <span style={{ width: '25%', textAlign: 'center' }}>danceability</span>
            <span style={{ width: '25%', textAlign: 'center' }}>valence</span>
          </div>
        </Col>
      </Row>

      <SearchModal visible={visible} setVisible={setVisible} params={params} setParams={setParams} search={search} setSearch={setSearch} />

      {/* {data.tracks && (
        <>
          {data.tracks.map(({ name: title, id, artists, album }) => (
            <ul key={id}>
              <li>제목: {title}</li>
              {artists[0].name && <li>아티스트: {artists[0].name}</li>}
              <li>
                <img src={album.images[1].url}></img>
              </li>
            </ul>
          ))}
        </>
      )} */}
    </>
  );
});

export default Recommend;
