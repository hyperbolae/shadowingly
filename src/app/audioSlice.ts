import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AudioStatus } from "../domain/audioStatus"
import { AppThunk } from "./store"

export interface AudioState {
  status: AudioStatus
  isRecording: boolean
  recordedSet: boolean
  delaySeconds: number
}

const initialState: AudioState = {
  status: AudioStatus.Stopped,
  isRecording: false,
  recordedSet: false,
  delaySeconds: 0
}

export const audioSlice = createSlice({
  name: "audioState",
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
    delayAudio: (state) => {
      state.status = AudioStatus.Delayed
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
    },
    setDelay: (state, action: PayloadAction) => {
      if (action.payload > 0 && action.payload < 5) {
        state.delaySeconds = action.payload
      }
    }
  }
})

export const { pauseAudio, playAudio, stopAudio, startRecording, stopRecording, delayAudio } = audioSlice.actions

export const playAudioWithDelay = (): AppThunk => (dispatch, getState) => {
  const state = getState().audio

  if (state.delaySeconds > 0 && state.status === AudioStatus.Stopped) {
    dispatch(delayAudio())

    setTimeout(() => dispatch(playAudio()), state.delaySeconds * 1000)
  } else {
    dispatch(playAudio())
  }
}

export const audioReducer = audioSlice.reducer
