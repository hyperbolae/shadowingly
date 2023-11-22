import { useAppDispatch } from '../../../app/hooks'
import { setCurrentView } from '../../../app/viewSlice'
import { Views } from '../../../constants/views'
import { ListeningTypeSelector } from '../channelSelector/ListeningTypeSelector'
import { PlayButton } from '../playButton/PlayButton'
import { ProgressBarContainer } from '../progressBar/ProgressBarContainer'
import { RecordButton } from '../recordButton/RecordButton'
import styles from './ShadowingLayout.module.css'

export function ShadowingLayout() {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.layout}>
      <div className={styles.playback}>
        <ProgressBarContainer/>
        <div className={styles.buttons}>
          <RecordButton/>
          <PlayButton/>
        </div>
      </div>
      <div className={styles.options}>
        <ListeningTypeSelector/>
        <button onClick={() => dispatch(setCurrentView(Views.MainFileSelector))}>Choose new audio</button>
      </div>
    </div>
  )
}