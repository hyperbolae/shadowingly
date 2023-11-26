import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { setCurrentView } from "../../app/viewSlice"
import { Views } from "../../domain/views"
import { DownloadInput } from "../shared/downloadInput/DownloadInput"
import "./MainFileSelector.module.css"
import styles from "./MainFileSelector.module.css"

const downloadId = "select-file"

export function MainFileSelector() {
  const dispatch = useAppDispatch()

  function handleSearchClick() {
    dispatch(setCurrentView(Views.Search))
  }

  return (
    <div className={styles.container}>
      <button className={styles.search} onClick={handleSearchClick}>
        Search for audio
      </button>
      <label className={styles.upload} htmlFor={downloadId}>
        <DownloadInput id={downloadId} />
        <span>Upload an MP3</span>
      </label>
    </div>
  )
}
