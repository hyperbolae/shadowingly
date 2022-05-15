import React, {ChangeEvent} from 'react'

interface FileSelectorProps {
  audioSelected: boolean
  setPlayback(file: File): Promise<void>
}

export function FileSelector(props: FileSelectorProps) {

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      await props.setPlayback(event.target.files[0]);
    }
  }

  return (
    <div>
      <label htmlFor="select-file">Choose file</label>
      <input type="file" id="select-file" name="file" accept=".mp3" onChange={handleUploadChange}/>
    </div>
  )
}
