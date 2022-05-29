import React, { memo, useEffect } from 'react';
import { List, Avatar, Modal } from 'antd';

import Spinner from './Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { search as onSearch } from '../slices/Search';
import logo from '../assets/img/Spotify_Logo.png';

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

  const handleClick = (id, name, artists) => {
    setParams({
      ...params,
      seed_artists: artists.map((artist) => artist.id).join(','),
      seed_tracks: id,
    });

    setSearch({
      ...search,
      title: name,
      artist: artists.map((artist) => artist.name).join(', '),
    });

    setVisible(false);
  };

  useEffect(() => {
    if (search.query) {
      dispatch(
        onSearch({
          q: search.query,
          type: 'track',
          limit: '10',
          token: token,
        })
      );
    }
  }, [search.query, dispatch, token]);

  return (
    <>
      <Spinner visible={isLoading} />
      <Modal title="검색" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <img src={logo} alt="spotify" width="20%" />
        {data.tracks && (
          <div className="searchList">
            <List
              style={{ cursor: 'pointer' }}
              itemLayout="horizontal"
              dataSource={data.tracks.items}
              renderItem={({ id, name, album: { artists, images } }) => (
                <List.Item
                  onClick={(e) => {
                    handleClick(id, name, artists);
                  }}
                >
                  <List.Item.Meta avatar={<Avatar src={images[2].url} />} title={name} description={artists.map((artist) => artist.name).join(', ')} />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </>
  );
});

export default SearchModal;
