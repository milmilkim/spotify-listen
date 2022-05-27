import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReco } from '../slices/RecommendationSlice';

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
  const { data } = useSelector((state) => state.recommendation);

  const [genres, setGenres] = useState([]);
  const [params, setParams] = useState({
    token: token,
    seed_artists: '6RHTUrRF63xao58xh9FXYJ',
    seed_tracks: '0Q5VnK2DYzRyfqQRJuUtvi',
    seed_genres: genres,
    energy: 0.5,
    loudness: 0.5,
    danceability: 0.5,
    valence: 0.5,
  });

  const [type, setType] = useState('');

  const [visible, setVisible] = useState(false);

  const onSearchTitle = (e) => {
    setVisible(true);
    setType('track');
  };
  const onSearchArtist = (e) => {
    setVisible(true);
    setType('artist');
  };

  const handleSlider = (value, name) => {
    const nextParams = {
      ...params,
      [name]: value / 100,
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

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      dispatch(getReco(params));
      console.log(data);
    },
    [data, dispatch]
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
      <Row style={{ justifyContent: 'space-between' }} align="middle">
        <Col span={15} style={{ position: 'relative' }}>
          {/* 왼쪽 */}
          <StyledDivider orientation="left" orientationMargin="0">
            트랙/아티스트
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

              <Search
                placeholder="아티스트"
                onSearch={onSearchArtist}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Row>
          <Row>
            <Alert message={`${params.seed_tracks}-${params.seed_artists}`} type="info" style={{ marginTop: '20px' }} />
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
              ></Slider>
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

      <SearchModal visible={visible} setVisible={setVisible} params={params} setParams={setParams} type={type} />

      {data.tracks && (
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
      )}
    </>
  );
});

export default Recommend;
