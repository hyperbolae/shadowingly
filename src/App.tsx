import React from 'react'
import styles from './App.module.css'
import { useAppSelector } from './app/hooks'
import { MainFileSelector } from './components/mainFileSelector/MainFileSelector'
import { SearchPanel } from './components/search/audioSearch/SearchPanel'
import { ShadowingLayout } from './components/shadowing/shadowingLayout/ShadowingLayout'
import { Views } from './domain/views'

function App() {
  const currentPanel = useAppSelector(state => state.panel.current)
  const selected = useAppSelector(state => state.playbackFile.set)

  const CurrentView = () => {
    if (currentPanel === Views.Shadowing && !selected) {
      return <MainFileSelector/>
    }

    switch (currentPanel) {
      case Views.Search:
        return <SearchPanel/>
      case Views.Shadowing:
        return <ShadowingLayout/>
      case Views.MainFileSelector:
      default:
        return <MainFileSelector/>
    }
  }

  return (
    <div className={styles.content}>
      <main className={styles.mainPanel}>
        <CurrentView/>
      </main>
    </div>
  )
}

export default App
