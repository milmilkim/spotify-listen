import { useEffect, memo } from 'react';
import SearchInput from '../components/SearchInput';
import { Row } from 'antd';
import styled from 'styled-components';

import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { search as onSearch } from '../slices/Search';

import Slider from '../components/Slider';
import logo from '../assets/img/Spotify_Logo.png';

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.search);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(
      onSearch({
        q: 'genre:k-pop',
        type: 'track',
        limit: '20',
        token: token,
      })
    );
  }, [dispatch, token]);

  return (
    <>
      <Spinner visible={isLoading} />
      <StyledRow>
        <SearchInput />
      </StyledRow>
      <br />
      {data.tracks && (
        <>
          <Slider data={data.tracks.items} />
        </>
      )}
      <br />
      <img src={logo} alt="spotify" width="100px" style={{ marginLeft: '10%' }} />
    </>
  );
}

export default memo(Main);
