import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getReco } from '../slices/RecommendationSlice';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';

const RecommendResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .recommendResultTitle {
    font-size: 2rem;
    padding: 15px;
    margin-bottom: 0;
  }

  .recommendResultList {
    width: 75vw;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

const RecommendResult = () => {
  const dispatch = useDispatch();
  const { state: params } = useLocation();
  const { data, isLoading } = useSelector((state) => state.recommendation);

  useEffect(() => {
    dispatch(getReco(params));
  }, [dispatch, params]);

  return (
    <RecommendResultContainer>
      {/* 헤더영역 */}
      <div></div>

      <h3 className="recommendResultTitle">추천 결과</h3>
      <Spinner visible={isLoading} />
      <div className="recommendResultList">
        {/* 검색 결과 영역 */}
        {data.tracks &&
          data.tracks.map(({ album, id }, i) => {
            /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
            let artistsName = '';
            album.artists.map((v2, i2) => (artistsName += v2.name + ' '));

            return (
              <ListItem key={i} id={id} /* 앨범 고유 아이디 */ imgSrc={album.images[1].url} /* 중간사이즈 이미지 */ mainTitle={album.name} /* 앨범 이름 */ subTitle={artistsName} /* 아티스트 이름 */ />
            );
          })}
      </div>
    </RecommendResultContainer>
  );
};

export default RecommendResult;
