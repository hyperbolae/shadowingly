import React from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { RootState } from './app/store'
import { ListeningTypeSelector } from './components/channelSelector/ListeningTypeSelector'
import { MainFileSelector } from './components/mainFileSelector/MainFileSelector'
import { PlayButton } from './components/playButton/PlayButton'
import { ProgressBarContainer } from './components/progressBar/ProgressBarContainer'
import { RecordButton } from './components/recordButton/RecordButton'

function App() {
  const selected = useSelector((state: RootState) => state.playbackFile.set)

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
