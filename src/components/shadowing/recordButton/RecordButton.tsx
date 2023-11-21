import React from 'react'
import { useDispatch } from 'react-redux'
import { startRecording, stopRecording } from '../../../app/audioSlice'
import { useAppSelector } from '../../../app/hooks'
import { RecordIcon, RecordStopIcon } from '../../shared/icons/icons'
import '../../styles/Button.css'


export function RecordButton() {
  const isRecording = useAppSelector(state => state.audio.isRecording)
  const dispatch = useDispatch()

  const Icon = isRecording ? RecordStopIcon : RecordIcon

  const handleClick = () => isRecording ? dispatch(stopRecording()) : dispatch(startRecording())

  return (
    <button className="round-button" onClick={handleClick}>
      <Icon/>
    </button>
  )
}
