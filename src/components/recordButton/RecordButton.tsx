import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRecording, stopRecording } from '../../app/audioSlice'
import { RootState } from '../../app/store'
import { RecordIcon, RecordStopIcon } from '../icons/icons'
import '../styles/Button.css'


export function RecordButton() {
  const isRecording = useSelector((state: RootState) => state.audio.isRecording)
  const dispatch = useDispatch()

  const Icon = isRecording ? RecordStopIcon : RecordIcon

  const handleClick = () => isRecording ? dispatch(stopRecording()) : dispatch(startRecording())

  return (
    <button className="round-button" onClick={handleClick}>
      <Icon/>
    </button>
  )
}
