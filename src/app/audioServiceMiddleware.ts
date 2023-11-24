import type { TypedStartListening } from "@reduxjs/toolkit"
import { createListenerMiddleware } from "@reduxjs/toolkit"
import { AudioServiceSingleton } from "../audioService/audioService"
import { pauseAudio, playAudio, startRecording, stopAudio, stopRecording } from "./audioSlice"
import { _setPlaybackFile } from "./playbackFileSlice"

import type { AppDispatch, RootState } from "./store"

export const audioServiceMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = audioServiceMiddleware.startListening as AppStartListening

const audioService = AudioServiceSingleton.getInstance()

startAppListening({
  actionCreator: playAudio,
  effect: (_, listenerApi) => {
    const stopOnEnd = () => listenerApi.dispatch(stopAudio())
    audioService.start(stopOnEnd)
  }
})

startAppListening({
  actionCreator: pauseAudio,
  effect: (_, listenerApi) => {
    audioService.pause()
  }
})

startAppListening({
  actionCreator: stopAudio,
  effect: () => {
    audioService.stop()
  }
})

startAppListening({
  actionCreator: _setPlaybackFile,
  effect: async (action) => {
    await audioService.setPlaybackFile(action.payload)
  }
})

startAppListening({
  actionCreator: startRecording,
  effect: (_, listenerApi) => {
    const stopOnEnd = () => listenerApi.dispatch(stopRecording())
    audioService.record(stopOnEnd)
  }
})

startAppListening({
  actionCreator: stopRecording,
  effect: () => {
    audioService.stop()
  }
})
