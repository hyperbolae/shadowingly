import { useAppSelector } from '../../app/hooks'
import { ListeningTypeSelector } from '../channelSelector/ListeningTypeSelector'
import { PlayButton } from '../playButton/PlayButton'
import { ProgressBarContainer } from '../progressBar/ProgressBarContainer'
import { RecordButton } from '../recordButton/RecordButton'
import { SearchPanel } from '../searchPanel/SearchPanel'
import styles from './MainPanel.module.css'

export function MainPanel() {
  const selected = useAppSelector(state => state.playbackFile.set)

  const PanelContent = () => {
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
        </div>
      </div>
    )
  }

  return (
    <main className={styles.mainPanel}>
      {selected ? <PanelContent/> : <SearchPanel/>}
    </main>
  )
}
