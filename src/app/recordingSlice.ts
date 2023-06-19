import { createSlice } from '@reduxjs/toolkit'

export interface SourcesState {
  isRecording: boolean
  recordedSet: boolean
}

const initialState: SourcesState = {
  isRecording: false,
  recordedSet: false
}

export const recordingSlice = createSlice({
  name: 'recording',
  initialState: initialState,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true
      state.recordedSet = false
    },
    stopRecording: (state) => {
      state.isRecording = false
      state.recordedSet = true
    },
    clearRecorded: (state) => {
      state.recordedSet = false
    }
  }
})

export const {
  startRecording,
  stopRecording,
  clearRecorded
} = recordingSlice.actions

export const recordingReducer = recordingSlice.reducer
