import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlayCircleOutlined } from '@ant-design/icons';
import { ResponsiveRadar } from '@nivo/radar';

import ListItem from '../components/ListItem';
import { getTracks } from '../slices/TracksSlice';
import { Button } from 'antd';

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
  const dispatch = useDispatch();

  /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
  let artistsName = '';
  tracksData &&
    tracksData?.album?.artists.map(
      (aritst) => (artistsName += aritst.name + ''),
    );

  useEffect(() => {
    token &&
      dispatch(
        getTracks({
          id,
          token,
        }),
      );
  }, [dispatch, id, token]);

  return (
    <SearchResultContainer>
      {/* 헤더영역 */}
      <div></div>

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
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          size="large"
          href={tracksData?.external_urls?.spotify}
          target="_blank"
        >
          스포티파이에서 재생
        </Button>
      </div>

      {/* radar 그래프 */}
      <div></div>
    </SearchResultContainer>
  );
};

export default React.memo(SearchResult);
