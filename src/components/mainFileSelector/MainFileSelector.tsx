import React, {ChangeEvent} from 'react'
import './MainFileSelector.css';

interface FileSelectorProps {
  setPlayback(file: File): Promise<void>
}

export function MainFileSelector(props: FileSelectorProps) {

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      await props.setPlayback(event.target.files[0]);
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
