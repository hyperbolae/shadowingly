import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { setShowSettings, setInterfaceLanguage } from "../../../app/settingsSlice"
import { useRef } from "react"
import * as styles from "./Settings.module.css"

export function Settings() {
  const dispatch = useAppDispatch()
  const showSettings = useAppSelector((state) => state.settings.showSettings)
  const interfaceLanguage = useAppSelector((state) => state.settings.interfaceLanguage)
  const ref = useRef<HTMLDivElement | null>(null)

  if (ref.current) {
    if (showSettings) {
      ref.current.showModal()
    } else {
      ref.current.close()
    }
    /* Catch any dialog close events that may occur outside of our knowledge
       (triggered by browsers, screenreaders, and/or extentions). */
    ref.current.onclose = () => dispatch(setShowSettings(false))
  }

  return (
    <dialog
      ref={ref}
      onClose={(event) => {
        ;() => dispatch(setShowSettings(false))
      }}
    >
      <h1>Settings</h1>
      <label htmlFor="language-select">Language</label>
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
