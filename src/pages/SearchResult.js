import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ResponsiveRadar } from '@nivo/radar';

import ListItem from '../components/ListItem';
import { getTracks } from '../slices/TracksSlice';

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .searchList {
    width: 75vw;
    border: 1px solid rgba(0, 0, 0, 0.06);
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
          />
        )}
      </div>

      {/* radar 그래프 */}
      <div></div>
    </SearchResultContainer>
  );
};

export default React.memo(SearchResult);
