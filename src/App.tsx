import React, {useState} from 'react';
import {FileSelector} from "./components/fileSelector/FileSelector";
import logo from './logo.svg';
import './App.css';
import {AudioService} from "./services/audioService";
import {getAudioServiceWriter} from "./services/audioServiceWriter";

function App() {
  const [audioService] = useState(new AudioService());
  const [selected, setSelected] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const {
    setPlaybackSource,
    clearPlaybackSource,
    setRecordingSource,
    clearRecordingSource
  } = getAudioServiceWriter(audioService, setSelected, setRecorded);

  return (
    <div className="App">
      <FileSelector audioSelected={selected} setPlayback={setPlaybackSource}></FileSelector>
    </div>
  );
}

export default App;
