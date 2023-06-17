import type { TypedStartListening } from '@reduxjs/toolkit'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { AudioServiceSingleton } from '../audioService/audioService'
import { play, stop } from './audioStatus'
import { setPlaybackFile } from './playbackFileSlice'

import type { AppDispatch, RootState } from './store'

export const audioServiceMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = audioServiceMiddleware.startListening as AppStartListening

const audioService = AudioServiceSingleton.getInstance()

startAppListening({
  actionCreator: play,
  effect: (_, listenerApi) => {
    const stopOnEnd = () => listenerApi.dispatch(stop())
    audioService.play(stopOnEnd)
  }
})

startAppListening({
  actionCreator: stop,
  effect: () => {
    audioService.stop()
  }
})

startAppListening({
  actionCreator: setPlaybackFile,
  effect: async (action) => {
    await audioService.setPlaybackFile(action.payload)
  }
})
