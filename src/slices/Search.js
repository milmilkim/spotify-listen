import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../config';

export const search = createAsyncThunk('SearchSlice/search', async (payload) => {
  let result = null;

  try {
    result = await axios.get('/search', {
      baseURL: BASE_URL,
      params: {
        q: payload.q,
        type: payload.type || 'tracks',
        limit: payload.limit,
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

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    data: {
      trakcs: '',
      albums: '',
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [search.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [search.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: payload.data,
      };
    },
    [search.rejected]: (state, { payload }) => {
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

export default SearchSlice.reducer; //리듀서 객체 내보내기
