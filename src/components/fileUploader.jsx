import React, { useState } from 'react';

export function FileUploader() {
  const [leftFile, setLeftFile] = useState();
  const [rightFile, setRightFile] = useState();

  const leftChangeHandler = (event) => {
    setLeftFile(event.target.files[0]);
  };

  const rightChangeHandler = (event) => {
    setRightFile(event.target.files[0]);
  };

  const readUploadedFile = (inputFile) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsArrayBuffer(inputFile);
    });
  };

  const handlePlay = async () => {
    const context = new AudioContext();

    const merger = context.createChannelMerger(2);

    const leftArrayBuffer = await readUploadedFile(leftFile);
    const leftAudioBuffer = await context.decodeAudioData(leftArrayBuffer);
    const leftSource = context.createBufferSource();
    leftSource.buffer = leftAudioBuffer;
    leftSource.connect(merger, 0, 0);

    const rightArrayBuffer = await readUploadedFile(rightFile);
    const rightAudioBuffer = await context.decodeAudioData(rightArrayBuffer);
    const rightSource = context.createBufferSource();
    rightSource.buffer = rightAudioBuffer;
    rightSource.connect(merger, 0, 1);

    merger.connect(context.destination);

    leftSource.start();
    rightSource.start();
  };

  return(
    <div>
      <label htmlFor="left">Left channel</label>
      <input type="file" id="left" name="file" onChange={leftChangeHandler}/>
      <label htmlFor="right">Right channel</label>
      <input type="file" id="right" name="file" onChange={rightChangeHandler}/>
      <div>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  )
}
