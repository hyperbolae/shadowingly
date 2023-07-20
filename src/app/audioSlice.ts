import { createSlice } from '@reduxjs/toolkit'
import { AudioStatus } from '../constants/audioStatus'

export interface AudioState {
  status: AudioStatus,
  isRecording: boolean,
  recordedSet: boolean
}

const initialState: AudioState = {
  status: AudioStatus.Stopped,
  isRecording: false,
  recordedSet: false
}

export const audioSlice = createSlice({
  name: 'audioState',
  initialState: initialState,
  reducers: {
    pauseAudio: (state) => {
      state.status = AudioStatus.Paused
    },
    playAudio: (state) => {
      state.status = AudioStatus.Playing
    },
    stopAudio: (state) => {
      state.status = AudioStatus.Stopped
    },
    startRecording: (state) => {
      state.status = AudioStatus.Playing
      state.isRecording = true
      state.recordedSet = false
    },
    stopRecording: (state) => {
      state.status = AudioStatus.Stopped
      state.isRecording = false
      state.recordedSet = true
    },
    clearRecorded: (state) => {
      state.recordedSet = false
    }
  }
})

export const { pauseAudio, playAudio, stopAudio , startRecording, stopRecording, clearRecorded} = audioSlice.actions

export const audioReducer = audioSlice.reducer
