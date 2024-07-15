import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { audioServiceMiddleware } from "./audioServiceMiddleware"
import { audioReducer } from "./audioSlice"
import { _setPlaybackFile, playbackFileReducer } from "./playbackFileSlice"
import { sentenceReducer } from "./sentenceSlice"
import { viewReducer } from "./viewSlice"
import { settingsReducer } from "./settingsSlice"

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    playbackFile: playbackFileReducer,
    panel: viewReducer,
    sentence: sentenceReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [_setPlaybackFile.type]
      }
    }).prepend(audioServiceMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
