import { useRef } from 'react'
import { AudioServiceSingleton } from './audioService'

export function useAudioService() {
  const audioService = useRef(AudioServiceSingleton.getInstance())

  return audioService.current
}
