import React, { memo, useEffect } from 'react';
import { Modal } from 'antd';
import Spinner from './Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { search as onSearch } from '../slices/Search';
import ListItem from './ListItem';

const SearchModal = memo(({ visible, setVisible, params, setParams, search, setSearch }) => {
  const { data, isLoading } = useSelector((state) => state.search);
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = (id, name, artist) => {
    setParams({
      ...params,
      seed_artists: artist.id,
      seed_tracks: id,
    });

    setSearch({
      ...search,
      title: name,
      artist: artist.name,
    });

    setVisible(false);
  };

  useEffect(() => {
    if (search.query) {
      dispatch(
        onSearch({
          q: search.query,
          type: 'track',
          limit: '3',
          token: token,
        })
      );
    }
  }, [search.query, dispatch]);

  return (
    <>
      <Spinner visible={isLoading} />
      <Modal title="검색" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        {data.tracks && (
          <div className="searchList">
            {data.tracks.items &&
              data.tracks.items.map(({ album, id, name }, i) => {
                /* 한 앨범의 아티스트가 여러명일 수 있기 때문에 반복을 돌아 문자열로 처리했습니다. */
                let artistsName = '';
                album.artists.map((v2, i2) => (artistsName += v2.name + ' '));

                return (
                  <div
                    onClick={(e) => {
                      handleClick(id, name, album.artists[0]);
                    }}
                  >
                    <ListItem
                      key={i}
                      id={id}
                      /* 곡 고유 아이디 */ imgSrc={album.images[1].url}
                      /* 중간사이즈 이미지 */ mainTitle={name}
                      /* 곡 이름 */ subTitle={artistsName}
                      /* 아티스트 이름 */
                    ></ListItem>
                  </div>
                );
              })}
          </div>
        )}
      </Modal>
    </>
  );
});

export default SearchModal;
