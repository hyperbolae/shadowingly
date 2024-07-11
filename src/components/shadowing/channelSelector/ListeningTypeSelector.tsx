import React, { useState } from "react"
import { useAudioService } from "../../../audioService/hooks"
import { ListeningType, Mixed, Single } from "../../../domain/listeningType"
import { mergeStyles } from "../../../utils/styling"
import * as styles from "./ListeningTypeSelector.module.css"

export function ListeningTypeSelector() {
  const audioService = useAudioService()
  const [currentChannel, setCurrentChannel] = useState(audioService.listeningType)

  function handleChange(type: ListeningType) {
    audioService.listeningType = type
    setCurrentChannel(type)
  }

  function ListeningTypeButton({ type, title }: { type: ListeningType; title: string }) {
    const labelClass = mergeStyles(styles.channelButton, currentChannel === type && styles.selected)

    return (
      <div key={type}>
        <input
          type="radio"
          id={type}
          checked={currentChannel === type}
          onChange={() => handleChange(type)}
          title={title}
          className={styles.channelInput}
        />
        <label htmlFor={type} title={title} className={labelClass}>
          {title}
        </label>
      </div>
    )
  }

  return (
    <fieldset className={styles.channelContainer}>
      <legend className={styles.legend}>Listening Type</legend>
      <div className={styles.buttons}>
        <ListeningTypeButton type={Mixed.Both} title="Both" />
        <ListeningTypeButton type={Single.RecordingOnly} title="Recording Only" />
        <ListeningTypeButton type={Single.PlaybackOnly} title="Playback Only" />
      </div>
    </fieldset>
  )
}
