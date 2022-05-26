import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReco } from '../slices/RecommendationSlice';

const Recommendation = memo(() => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.recommendation);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(
      getReco({
        token,
        seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
        seed_genres: 'classical,country',
        seed_tracks: '0c6xIDDpzE81m2q797ordA',
        min_energy: 0.5,
        min_loudness: 0.5,
        min_danceability: 0.5,
        min_valence: 0.5,
      })
    );

    console.log(data);
  }, [dispatch]);

  return (
    <div>
      <h1>Recommendation-test</h1>
      <p> {error != null && <>{JSON.stringify(error)}</>}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
});

export default Recommendation;
