import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ListItem from '../components/ListItem';
import SearchInput from '../components/SearchInput';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .searchInputTitle {
    font-size: 2rem;
    font-weight: bold;
  }

  .searchList {
    width: 75vw;
    border: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 25px;
  }
`;

const Search = () => {
  const { data } = useSelector((state) => state.search);

  return (
    <SearchContainer>
      {/* 헤더영역 */}
      <div></div>

      {/* 검색창 영역 */}
      <SearchInput>
        <h3 className="searchInputTitle">제목으로 검색</h3>
      </SearchInput>

      {/* 검색 결과 영역 */}
      <div className="searchList">
        {data &&
          data?.tracks?.items?.map(({ album, name, id }, i) => {
            /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
            let artistsName = '';
            album.artists.map((v2, i2) => (artistsName += v2.name + ' '));

            return (
              <ListItem
                key={i}
                id={id}
                imgSrc={album.images[1].url} /* 중간사이즈 이미지 */
                mainTitle={name} /* 곡 이름 */
                subTitle={artistsName} /* 아티스트 이름 */
              />
            );
          })}
      </div>
    </SearchContainer>
  );
};

export default React.memo(Search);
