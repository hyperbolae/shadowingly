import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { setPlaybackFile } from "../../../app/playbackFileSlice"
import { clearSentence } from "../../../app/sentenceSlice"
import * as styles from "./UploadInput.module.css"

export interface UploadInputProps {
  id: string
}

export function UploadInput(props: UploadInputProps) {
  const dispatch = useAppDispatch()

  async function handleUploadChange(event: ChangeEvent) {
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
