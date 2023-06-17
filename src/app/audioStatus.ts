import { createSlice } from '@reduxjs/toolkit'
import { AudioStatus } from '../constants/audioStatus'

export interface AudioState {
  status: AudioStatus
}

const initialState: AudioState = {
  status: AudioStatus.Stopped
}

export const audioStateSlice = createSlice({
  name: 'audioState',
  initialState: initialState,
  reducers: {
    play: (state) => {
      state.status = AudioStatus.Playing
    },
    pause: (state) => {
      state.status = AudioStatus.Paused
    },
    record: (state) => {
      state.status = AudioStatus.Recording
    },
    stop: (state) => {
      state.status = AudioStatus.Stopped
    }
  }
})

export const { play, pause, record, stop } = audioStateSlice.actions

export const audioReducer = audioStateSlice.reducer
