import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { Views } from "../domain/views"
import { AppThunk } from "./store"
import { setCurrentView } from "./viewSlice"

export interface PlaybackFileState {
  set: boolean
  loaded: boolean
}

const initialState: PlaybackFileState = {
  set: false,
  loaded: false
}

export const playbackFileSlice = createSlice({
  name: "playbackFile",
  initialState: initialState,
  reducers: {
    _setPlaybackFile: (state, _: PayloadAction) => {
      state.set = true
      state.loaded = false
    },
    clearPlaybackFile: (state) => {
      state.set = false
      state.loaded = false
    },
    setPlaybackFileLoaded: (state) => {
      state.loaded = true
    }
  }
})

export const { _setPlaybackFile, setPlaybackFileLoaded } = playbackFileSlice.actions

export const setPlaybackFile =
  (payload: File): AppThunk =>
  (dispatch) => {
    dispatch(_setPlaybackFile(payload))
    dispatch(setCurrentView(Views.Shadowing))
  }

export const playbackFileReducer = playbackFileSlice.reducer
