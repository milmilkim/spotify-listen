import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* ========================================================== */
// 토큰 값 하드코딩
// export const token = 'BQBAK1BpJIpUwCBIYImATLtsutWeuBYyxGIJq8T4ujOOyh1yJiwO2fB99N69Th0Jo5VFvKSPUldzNY1CqQx9MJiNwVs-D9WUzMYdIcRsojD85Y5kGEy3yPakLl0hJoqbJ1ZfCl2A2UrH_layqcIXNG8f9x8B2sBOhKSOmlDC7AEE0w3VGg8y_om0u5cwhwoOy5WXC4tu_CXXHy-66ns6s2q1zFsrJ74w0vaXB54ILb-mjRB-BDyTUA';
/* ========================================================== */

const API_URL = 'https://api.spotify.com/v1/audio-features';

export const getAudioFeatures = createAsyncThunk(
  'AudioFeaturesSlice/getAudioFeatures',
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get(API_URL, {
        params: {
          ids: payload.ids,
        },
        headers: {
          Authorization: `Bearer ${payload.token}`, // <-- 하드코딩한 값으로 테스트 시, `token`을 사용합니다.
        },
      });
    } catch (e) {
      result = rejectWithValue(e.response);
    }

    return result;
  },
);

const AudioFeaturesSlice = createSlice({
  name: 'audioFeatures',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getAudioFeatures.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getAudioFeatures.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getAudioFeatures.rejected]: (state, { payload }) => {
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

export default AudioFeaturesSlice.reducer;
