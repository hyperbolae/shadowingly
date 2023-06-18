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
    playAudio: (state) => {
      state.status = AudioStatus.Playing
    },
    stopAudio: (state) => {
      state.status = AudioStatus.Stopped
    }
  }
})

export const { playAudio, stopAudio } = audioStateSlice.actions

export const audioReducer = audioStateSlice.reducer
