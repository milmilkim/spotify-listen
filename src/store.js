import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './slices/TokenSlice';
import RecommendationSlice from './slices/RecommendationSlice';
import AudioFeaturesSlice from './slices/AudioFeaturesSlice';
import TracksSlice from './slices/TracksSlice';

const store = configureStore({
  reducer: {
    token: TokenSlice,
    recommendation: RecommendationSlice,
    //여기에 추가
    audioFeatures: AudioFeaturesSlice,
    tracks: TracksSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
