import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';
import axios from 'axios';
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
export const getToken = createAsyncThunk('TokenSlice/getToken', async (payload, { rejectWidthValue }) => {
  let result = null;

  try {
    result = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (err) {
    result = rejectWidthValue(err.response);
    console.error(err);
  }

  return result;
});

const TokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
    isLogin: false,
    isLoading: false,
    error: null,
    data: null,
  },
  reducers: {
    setIsLogin: (state, action) => {
      return { ...state, isLogin: action.payload };
    },
    //로그인 여부 확인

    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    //토큰값을 설정함
  },
  extraReducers: {
    [getToken.pending]: (state, { payload }) => {
      return { ...state, isLoading: true };
    },
    [getToken.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        token: payload.data.access_token,
      };
    },
    [getToken.rejected]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export default TokenSlice.reducer; //리듀서 객체 내보내기
export const { checkLogin, setToken, setIsLogin } = TokenSlice.actions; //액션 함수 내보내기

//엄청..헷갈림!
