import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Views } from '../domain/views'
import { AppThunk } from './store'
import { setCurrentView } from './viewSlice'

export interface PlaybackFileState {
  set: boolean
}

const initialState: PlaybackFileState = {
  set: false
}

export const playbackFileSlice = createSlice({
  name: 'playbackFile',
  initialState: initialState,
  reducers: {
    _setPlaybackFile: (state, _: PayloadAction<File>) => {
      state.set = true
    },
    clearPlaybackFile: (state) => {
      state.set = false
    }
  }
})

export const {
  _setPlaybackFile
} = playbackFileSlice.actions

export const setPlaybackFile = (payload: File): AppThunk => (dispatch) => {
  dispatch(_setPlaybackFile(payload))
  dispatch(setCurrentView(Views.Shadowing))
}


export const playbackFileReducer = playbackFileSlice.reducer
