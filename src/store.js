import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './slices/TokenSlice';
import RecommendationSlice from './slices/RecommendationSlice';

const store = configureStore({
  reducer: {
    token: TokenSlice,
    recommendation: RecommendationSlice,
    //여기에 추가
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
