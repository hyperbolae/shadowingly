import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import './MainFileSelector.css'
import { setPlaybackFile } from '../../app/playbackFileSlice'

export function MainFileSelector() {
  const dispatch = useDispatch()

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      await dispatch(setPlaybackFile(event.target.files[0]))
    }
  }

  return (
    <div className="main-selector-container">
      <label className="main-selector">
        <input type="file" id="select-file" name="file" accept=".mp3" onChange={handleUploadChange}/>
        <span>Select a file</span>
      </label>
      {/*todo: add learn more/landing page*/}
      <a className="learn-more" href="/about" target="_blank" rel="noopener noreferrer">Learn more</a>
    </div>
  )
}
