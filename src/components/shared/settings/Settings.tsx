import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { setShowSettings } from "../../../app/viewSlice"
import { useRef } from "react"
import * as styles from "./Settings.module.css"

export function Settings() {
  const dispatch = useAppDispatch()
  const show_settings = useAppSelector((state) => state.panel.show_settings)
  const ref = useRef<HTMLDivElement | null>(null)

  if (show_settings) {
    if (ref.current) ref.current.showModal()
  } else {
    if (ref.current) ref.current.close()
  }

  return (
    <dialog ref={ref}>
      <h1>Settings</h1>
      <button className={styles.closeButton} onClick={() => dispatch(setShowSettings(false))}>
        Close
      </button>
    </dialog>
  )
}
