import { configureStore } from '@reduxjs/toolkit'
import { audioServiceMiddleware } from './audioServiceMiddleware'
import { audioReducer } from './audioSlice'
import { playbackFileReducer, setPlaybackFile } from './playbackFileSlice'

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    playbackFile: playbackFileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [setPlaybackFile.type],
        },
      }
    ).prepend(audioServiceMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
