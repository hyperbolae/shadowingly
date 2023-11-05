import { useAppSelector } from '../../app/hooks'
import { ListeningTypeSelector } from '../channelSelector/ListeningTypeSelector'
import { MainFileSelector } from '../mainFileSelector/MainFileSelector'
import { PlayButton } from '../playButton/PlayButton'
import { ProgressBarContainer } from '../progressBar/ProgressBarContainer'
import { RecordButton } from '../recordButton/RecordButton'
import styles from './MainPanel.module.css'

export function MainPanel() {
  const selected = useAppSelector(state => state.playbackFile.set)

  const PanelContent = () => {
    return (
      <div className={styles.layout}>
        <div className="playback">
          <ProgressBarContainer/>
          <div className={styles.buttons}>
            <RecordButton/>
            <PlayButton/>
          </div>
        </div>
        <div id="option">
          <ListeningTypeSelector/>
        </div>
      </div>
    )
  }

  return (
    <main className={styles.panel}>
      {selected ? <PanelContent/> : <MainFileSelector/>}
    </main>
  )
}
