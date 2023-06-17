import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { play, stop } from '../../app/audioStatus'
import { RootState } from '../../app/store'
import { AudioStatus } from '../../constants/audioStatus'
import { PlayIcon, StopIcon } from '../icons/icons'
import '../styles/Button.css'


function getIcon(status: AudioStatus) {
  switch (status) {
    case AudioStatus.Playing:
    case AudioStatus.Recording:
      return StopIcon
    case AudioStatus.Paused:
      return PlayIcon
    case AudioStatus.Stopped:
      return PlayIcon
  }
}

export function PlayButton() {
  const status = useSelector((state: RootState) => state.audio.status)
  const dispatch = useDispatch()

  const Icon = getIcon(status)

  function handleClick() {
    switch (status) {
      case AudioStatus.Playing:
        dispatch(stop())
        break
      case AudioStatus.Paused:
        dispatch(play())
        break
      case AudioStatus.Stopped:
        dispatch(play())
        break
    }
  }

  return (
    <button className="round-button" onClick={handleClick}>
      <Icon/>
    </button>
  )
}
