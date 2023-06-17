import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SourcesState {
  set: boolean
}

const initialState: SourcesState = {
  set: false
}

export const playbackFileSlice = createSlice({
  name: 'playbackFile',
  initialState: initialState,
  reducers: {
    setPlaybackFile: (state, _: PayloadAction<File>) => {
      state.set = true
    },
    clearPlaybackFile: (state) => {
      state.set = false
    }
  }
})

export const {
  setPlaybackFile
} = playbackFileSlice.actions

export const playbackFileReducer = playbackFileSlice.reducer
