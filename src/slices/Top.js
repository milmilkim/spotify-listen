import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../config';

export const getTop = createAsyncThunk('TopSlice/getTop', async (payload) => {
  let result = null;

  try {
    result = await axios.get('me/top/tracks', {
      baseURL: BASE_URL,
      params: {
        time_range: payload.time_range,
        limit: 5,
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

const TopSlice = createSlice({
  name: 'recommendation',
  initialState: {
    data: {
      items: '',
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getTop.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [getTop.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: payload.data,
      };
    },
    [getTop.rejected]: (state, { payload }) => {
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

export default TopSlice.reducer; //리듀서 객체 내보내기
