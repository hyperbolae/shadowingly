import React from 'react'
import { MainPanel } from './components/mainPanel/MainPanel'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.content}>
      <MainPanel/>
    </div>
  )
}

export default App
