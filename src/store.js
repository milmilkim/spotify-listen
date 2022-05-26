import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './slices/TokenSlice';

const store = configureStore({
  reducer: {
    token: TokenSlice,
    //여기에 추가
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
