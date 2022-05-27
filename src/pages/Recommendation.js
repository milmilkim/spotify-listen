import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getReco } from '../slices/RecommendationSlice';

import { Input, Space, Row, Col, Radio, Divider, Slider, Button } from 'antd';

import styled from 'styled-components';
import axios from 'axios';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const StyledDivider = styled(Divider)`
  span {
    font-weight: bolder;
    font-size: 22px;
  }
`;

const Recommendation = memo(() => {
  const { token } = useSelector((state) => state.token);

  const [genres, setGenres] = useState([]);
  const [params, setParams] = useState({
    token: token,
    seed_artists: null,
    seed_tracks: null,
    seed_genres: null,
    energy: 0.5,
    loudness: 0.5,
    danceability: 0.5,
    valence: 0.5,
  });

  const handleSlider = (value, name) => {
    const nextParams = {
      ...params,
      [name]: value,
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

  useEffect(() => {
    (async () => {
      let res = null;
      res = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.genres);
      setGenres(res.data.genres);
    })();
  }, [token]);

  return (
    <>
      <Row style={{ justifyContent: 'space-between' }} align="middle">
        <Col span={15} style={{ position: 'relative' }}>
          {/* 왼쪽 */}
          <StyledDivider orientation="left" orientationMargin="0">
            아티스트/트랙
          </StyledDivider>
          <Row>
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
          </Row>
          <Row>
            <StyledDivider orientation="left" orientationMargin="0">
              장르
            </StyledDivider>
            <Radio.Group name="genres" options={genres} optionType="button" onChange={handleChange} />
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            <Button type="primary" size="large" style={{ marginTop: '20px' }}>
              추천 검색
            </Button>
          </Row>
        </Col>
        <Col span={9}>
          {/* energy loudness danceability valence */}
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
                  handleSlider(e, 'loudness');
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
            <span style={{ width: '25%', textAlign: 'center' }}>loudness</span>
            <span style={{ width: '25%', textAlign: 'center' }}>danceability</span>
            <span style={{ width: '25%', textAlign: 'center' }}>valence</span>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default Recommendation;
