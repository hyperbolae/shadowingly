import React, { useState } from 'react';

export function FileUploader() {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePlay = () => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async function () {
      const context = new AudioContext();
      const blob = new Blob([reader.result])

      const audioUrl = window.URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      const track = context.createMediaElementSource(audio);

      const pannerOptions = { pan: 1 };
      const panner = new StereoPannerNode(context, pannerOptions);

      track.connect(panner).connect(context.destination);

      audio.play();
    }
  };

  return(
    <div>
      <input type="file" name="file" onChange={changeHandler}/>
      {selectedFile ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  )
}
