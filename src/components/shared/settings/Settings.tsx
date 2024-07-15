import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { setShowSettings, setInterfaceLanguage } from "../../../app/settingsSlice"
import { useRef } from "react"
import * as styles from "./Settings.module.css"

export function Settings() {
  const dispatch = useAppDispatch()
  const showSettings = useAppSelector((state) => state.settings.showSettings)
  const interfaceLanguage = useAppSelector((state) => state.settings.interfaceLanguage)
  const ref = useRef<HTMLDivElement | null>(null)

  if (showSettings) {
    if (ref.current) ref.current.showModal()
  } else {
    if (ref.current) ref.current.close()
  }

  return (
    <dialog ref={ref}>
      <h1>Settings</h1>
      <label for="language-select">Language</label>
      <select
        value={interfaceLanguage}
        id="language-select"
        onChange={(event) => dispatch(setInterfaceLanguage(event.target.value))}
      >
        <option value="en">English</option>
        <option value="jp">日本語</option>
        <option value="zh">简单中文</option>
      </select>
      <button className={styles.closeButton} onClick={() => dispatch(setShowSettings(false))}>
        Close
      </button>
    </dialog>
  )
}
