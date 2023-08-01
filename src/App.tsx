import React from 'react'
import './App.css'
import { useAppSelector } from './app/hooks'
import { ListeningTypeSelector } from './components/channelSelector/ListeningTypeSelector'
import { MainFileSelector } from './components/mainFileSelector/MainFileSelector'
import { PlayButton } from './components/playButton/PlayButton'
import { ProgressBarContainer } from './components/progressBar/ProgressBarContainer'
import { RecordButton } from './components/recordButton/RecordButton'

function App() {
  const selected = useAppSelector(state => state.playbackFile.set)

  if (selected) {
    return (
      <main id="app-content">
        <div id="app-content-container">
          <ListeningTypeSelector/>
          <ProgressBarContainer/>
          <div id="playback-buttons">
            <RecordButton/>
            <PlayButton/>
          </div>
        </div>
      </main>
    )

  } else {
    return (
      <MainFileSelector></MainFileSelector>
    )
  }
}

export default App
