import React, {useState} from 'react';
import {FileSelector} from "./components/fileSelector/FileSelector";
import logo from './logo.svg';
import './App.css';
import {AudioService} from "./services/audioService";
import {getAudioServiceWriter} from "./services/audioServiceWriter";
import {AudioRecorder} from "./components/audioRecorder/AudioRecorder";
import {AudioPlayer} from "./components/audioPlayer/AudioPlayer";

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
      {selected ? <AudioPlayer audioService={audioService}></AudioPlayer> : ""}
      <AudioRecorder setRecorded={setRecordingSource}></AudioRecorder>
    </div>
  );
}

export default App;
