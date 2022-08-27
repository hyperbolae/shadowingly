import React, {useState} from 'react';
import {FileSelector} from "./components/fileSelector/FileSelector";
import {MainFileSelector} from "./components/mainFileSelector/MainFileSelector";
import {PlaybackContainer} from "./components/PlaybackContainer";
import {AudioService} from "./services/audioService";
import {getAudioServiceHooks} from "./services/audioServiceHooks";
import {AudioRecorder} from "./components/audioRecorder/AudioRecorder";
import './App.css';

function App() {
  const [audioService] = useState(new AudioService());
  const [selected, setSelected] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const {
    setPlaybackSource,
    clearPlaybackSource,
    setRecordedSource,
    clearRecordedSource
  } = getAudioServiceHooks(audioService, setSelected, setRecorded);

  if (selected) {
    return (
      <div className="App">
        <FileSelector audioSelected={selected} setPlayback={setPlaybackSource}></FileSelector>
        <AudioRecorder setRecorded={setRecordedSource}></AudioRecorder>
        <PlaybackContainer audioService={audioService}></PlaybackContainer>
      </div>
    );

  } else {
    return (
      <MainFileSelector setPlayback={setPlaybackSource}></MainFileSelector>
    )
  }
}

export default App;
