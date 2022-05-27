import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReco } from '../slices/RecommendationSlice';
import ListItem from '../components/ListItem';

const RecommendResult = () => {
  const { data } = useSelector((state) => state.recommendation);
  const dispatch = useDispatch();

  /* ================================================================= */
  // 데이터가 잘 들어오는지 테스트
  useEffect(() => {
    dispatch(
      getReco({
        seed_artist: '4NHQUGzhtTLFvgF5SZesLK',
        seed_genres: 'classical,country',
        seed_tracks: '0c6xIDDpzE81m2q797ordA',
        token:
          'BQBvyhOqyOy9-ZnTiJsMLkpAx-9lzsTHH9ON2efCM3_LR8lz5WO5qoYu2PCduPY0-SY74SfCMG1jjqGQ6YMqVKN3oW3U_31M20y3AN9T_NGUujYsXhkAu3b02sEpUBvZHAzPV4VPYwk8u-L8KxO34nnkK9eCmgJRlmXVmH9G-9ZUL6iRmBUAD8clipvSQ1ZzRFrXvxSl9qLSobXR0rczjU7ijsjpMo9LA3vkYIe81UKfZu6Vr-2Zl1pCD7Q-k4gT4Q',
      }),
    );
  }, [dispatch]);
  /* ================================================================= */

  return (
    <div>
      {/* 헤더영역 */}
      <div></div>

      {/* 검색창 영역 */}
      <div></div>

      {/* 검색 결과 영역 */}
      {data.tracks &&
        data.tracks.map(({ album }, i) => {
          /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
          let artistsName = '';
          album.artists.map((v2, i2) => (artistsName += v2.name + ' '));

          return (
            <ListItem
              key={i}
              imgSrc={album.images[1].url} /* 중간사이즈 이미지 */
              mainTitle={album.name} /* 앨범 이름 */
              subTitle={artistsName} /* 아티스트 이름 */
            />
          );
        })}
    </div>
  );
};

export default RecommendResult;
