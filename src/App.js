import logo from './logo.svg';
import './App.css';
import React from 'react';
import { FileUploader } from './components/fileUploader';
import { AudioRecorder } from "./component/audioRecorder/audioRecorder";

function App() {
  return (
    <div className="App">
      <FileUploader/>
        <AudioRecorder />
    </div>
  );
}

export default App;
