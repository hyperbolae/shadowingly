import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { setPlaybackFile } from "../../../app/playbackFileSlice"
import { clearSentence } from "../../../app/sentenceSlice"
import styles from "./DownloadInput.module.css"

export interface DownloadInputProps {
  id: string
}

export function UploadInput(props: DownloadInputProps) {
  const dispatch = useAppDispatch()

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      dispatch(setPlaybackFile(event.target.files[0]))
      dispatch(clearSentence())
    }
  }

  return (
    <input
      className={styles.uploadInput}
      type="file"
      id={props.id}
      name="file"
      accept=".mp3"
      onChange={handleUploadChange}
    />
  )
}
