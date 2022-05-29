import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlayCircleOutlined } from '@ant-design/icons';
import { ResponsiveRadar } from '@nivo/radar';

import ListItem from '../components/ListItem';
import { getTracks } from '../slices/TracksSlice';
import { Button } from 'antd';
import { getAudioFeatures } from '../slices/AudioFeaturesSlice';

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .searchList {
    width: 75vw;
    border: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 25px;
  }

  .playBtn {
    width: 75vw;
    margin-bottom: 25px;
  }
`;

const SearchResult = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.token);

  const { data: tracksData } = useSelector((state) => state.tracks);
  const { data: audioData } = useSelector((state) => state.audioFeatures);
  const dispatch = useDispatch();

  /* 받아온 Audio Features 데이터를 radar 그래프에 넣어줄 형식으로 가공 */
  let newArr = [];
  let newObj = {};

  audioData &&
    Object.entries(audioData.audio_features[0]).map((v) => {
      newObj = {
        label: v[0],
        value: v[1],
      };
      newArr.push(newObj);

      return newArr;
    });

  let data = newArr.filter(
    (v) => v['label'] === 'danceability' || v['label'] === 'energy' || v['label'] === 'valence'
    // v['label'] === 'loudness', // 음수라 그래프가 생각대로 나오지 않아 제외했습니다.
  );

  /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
  let artistsName = '';
  tracksData && tracksData?.album?.artists.map((aritst) => (artistsName += aritst.name + ''));

  useEffect(() => {
    token &&
      dispatch(
        getTracks({
          id,
          token,
        })
      );

    token &&
      dispatch(
        getAudioFeatures({
          ids: id,
          token,
        })
      );
  }, [dispatch, id, token]);

  return (
    <SearchResultContainer>
      {/* 리스트 */}
      <div className="searchList">
        {tracksData && (
          <ListItem
            id={id}
            imgSrc={tracksData.album.images[1].url} /* 중간사이즈 이미지 */
            mainTitle={tracksData.name} /* 곡 이름 */
            subTitle={artistsName} /* 아티스트 이름 */
            duration={tracksData.duration_ms} /* 곡 재생 시간 (밀리초) */
            releaseDate={tracksData.album.release_date} /* 발매일 */
          />
        )}
      </div>

      {/* 스포티파이 재생 */}
      <div className="playBtn">
        <Button type="primary" icon={<PlayCircleOutlined />} size="large" href={tracksData?.external_urls?.spotify} target="_blank">
          스포티파이에서 재생
        </Button>
      </div>

      {/* radar 그래프 */}
      <div style={{ width: '600px', height: '600px' }}>
        <ResponsiveRadar
          data={data}
          keys={['value']}
          indexBy="label"
          maxValue={1}
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: 'color' }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          colors={['#1ED760']}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: 'top-left',
              direction: 'column',
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </SearchResultContainer>
  );
};

export default React.memo(SearchResult);
