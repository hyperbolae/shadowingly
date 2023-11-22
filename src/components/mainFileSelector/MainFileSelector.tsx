import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { setPlaybackFile } from '../../app/playbackFileSlice'
import { setCurrentView } from '../../app/viewSlice'
import { Views } from '../../constants/views'
import './MainFileSelector.css'

export function MainFileSelector() {
  const dispatch = useAppDispatch()

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      dispatch(setPlaybackFile(event.target.files[0]))
    }
  }

  function handleSearchClick() {
    dispatch(setCurrentView(Views.Search))
  }

  return (
    <div className="main-selector-container">
      <label className="main-selector">
        <input type="file" id="select-file" name="file" accept=".mp3" onChange={handleUploadChange}/>
        <span>Select a file</span>
      </label>
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
      {/*todo: add learn more/landing page*/}
      <a className="learn-more" href="/about" target="_blank" rel="noopener noreferrer">Learn more</a>
    </div>
  )
}
