import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setCurrentView } from "../../../app/viewSlice"
import { Views } from "../../../domain/views"
import { Dialogue } from "../../shared/dialogue/Dialogue"
import { ListeningTypeSelector } from "../channelSelector/ListeningTypeSelector"
import { PlayButton } from "../playButton/PlayButton"
import { ProgressBarContainer } from "../progressBar/ProgressBarContainer"
import { RecordButton } from "../recordButton/RecordButton"
import { Waveform } from "../waveform/Waveform"
import styles from "./ShadowingLayout.module.css"

export function ShadowingLayout() {
  const dispatch = useAppDispatch()
  const sentence = useAppSelector((state) => state.sentence.current)

  return (
    <div className={styles.layout}>
      <div className={styles.playback}>
        <Waveform />
        <ProgressBarContainer />
        <div className={styles.buttons}>
          <RecordButton />
          <PlayButton />
        </div>
        <div className={styles.dialogue}>{sentence && <Dialogue sentence={sentence} showTranscription={true} />}</div>
      </div>
      <div className={styles.options}>
        <ListeningTypeSelector />
        <button onClick={() => dispatch(setCurrentView(Views.MainFileSelector))}>Choose new audio</button>
      </div>
    </div>
  )
}
