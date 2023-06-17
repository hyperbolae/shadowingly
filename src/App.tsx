import React from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { RootState } from './app/store'
import { MainFileSelector } from './components/mainFileSelector/MainFileSelector'
import { PlayButton } from './components/playButton/PlayButton'

function App() {
  const selected = useSelector((state: RootState) => state.playbackFile.set)

  if (selected) {
    return (
      <PlayButton/>
    )

  } else {
    return (
      <MainFileSelector></MainFileSelector>
    )
  }
}

export default App
