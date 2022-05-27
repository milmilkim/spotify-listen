/**
 * @함수
 * getReco({
 *  token: 토큰
 *  seed_artists: 스포티파이id string
 *  seed-genres: string(','로 구분)
 *  seed-tracks: 스포티파이id string
 *  energy: >= 0 <= 1
 *  loudness: >= 0 <= 1
 *  danceability: >= 0 <= 1
 *  valence: >= 0 <= 1
 * })
 *
 * @state
 * data
 * isLoading
 * error
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../config';

export const getReco = createAsyncThunk('RecommendationSlice/getReco', async (payload) => {
  let result = null;

  try {
    result = await axios.get('/recommendations', {
      baseURL: BASE_URL,
      params: {
        seed_artists: payload.seed_artists,
        seed_genres: payload.seed_genres,
        seed_tracks: payload.seed_tracks,
        target_energy: payload.energy,
        target_danceability: payload.danceability,
        target_valence: payload.valence,
        target_liveness: payload.liveness,
        limit: 3,
      },
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
  } catch (err) {
    console.log(err.response.status);

    result = err.response;
  }

  return result;
});

const RecommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    data: { tracks: '' },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getReco.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [getReco.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: payload?.data,
      };
    },
    [getReco.rejected]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.message ? payload.message : '알 수 없는 오류',
        },
      };
    },
  },
});

export default RecommendationSlice.reducer; //리듀서 객체 내보내기
