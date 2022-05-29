import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* ========================================================== */
// 토큰 값 하드코딩
// export const token = 'BQBraWqP--22IgYuYb0jPXb6_ucL0LuLo-SIsxvS2MvPs3BhtalorKrrLoj-eOzyAxzEldOY9VyUPBD6MhGbwgTWsHtTGijX-37tOIJhj7CEvqCU0qX2vg7Gsb1vEwzhl1-GyPya2i8rz_f8Fz2D26LBusypbHIGfNWZhXZPMFnerA3Al31NBPn1afn3I0hYzSoXMW3dxbXdrtOh-lQHawlY4mYw_eyDRtokKgTX28V5nO1nTbsnFA';
/* ========================================================== */

const API_URL = `https://api.spotify.com/v1/tracks`;

export const getTracks = createAsyncThunk('Tracks/getTracks', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get(`${API_URL}/${payload.id}`, {
      params: {
        market: payload.market || 'ES',
      },
      headers: {
        Authorization: `Bearer ${payload.token}`, // <-- 하드코딩한 값으로 테스트 시, `token`을 사용합니다.
      },
    });
  } catch (e) {
    result = rejectWithValue(e.response);
  }

  return result;
});

const Tracks = createSlice({
  name: 'tracks',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getTracks.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getTracks.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getTracks.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : 'ServerError',
        },
      };
    },
  },
});

export default Tracks.reducer;
