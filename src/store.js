import { configureStore } from '@reduxjs/toolkit';
import TokenSlice from './slices/TokenSlice';
import AudioFeaturesSlice from './slices/AudioFeaturesSlice';
import TracksSlice from './slices/TracksSlice';

const store = configureStore({
  reducer: {
    token: TokenSlice,
    //여기에 추가
    audioFeatures: AudioFeaturesSlice,
    tracks: TracksSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
