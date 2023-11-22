import React from 'react'
import { pauseAudio, playAudio, playAudioWithDelay } from '../../../app/audioSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AudioStatus } from '../../../constants/audioStatus'
import { Icon, PauseIcon, PlayIcon } from '../../shared/icons/icons'
import '../../styles/Button.css'


function getIcon(status: AudioStatus): Icon {
  switch (status) {
    case AudioStatus.Playing:
    case AudioStatus.Recording:
      return PauseIcon
    case AudioStatus.Paused:
      return PlayIcon
    case AudioStatus.Stopped:
      return PlayIcon
    case AudioStatus.Delayed:
      return PlayIcon
  }
}

export function PlayButton() {
  const status = useAppSelector(state => state.audio.status)
  const dispatch = useAppDispatch()

  const Icon = getIcon(status)

  function handleClick() {
    switch (status) {
      case AudioStatus.Playing:
        dispatch(pauseAudio())
        break
      case AudioStatus.Paused:
        dispatch(playAudio())
        break
      case AudioStatus.Stopped:
        dispatch(playAudioWithDelay())
        break
    }
  }

  return (
    <button className="round-button" onClick={handleClick}>
      <Icon/>
    </button>
  )
}
