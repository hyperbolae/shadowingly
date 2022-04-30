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
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsArrayBuffer(inputFile);
    });
  };

  const Channel = {
    Left: 0,
    Right: 1
  }

  const createSource = async (context, file, merger, channel) => {
    const arrayBuffer = await readUploadedFile(file);
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(merger, 0, channel);

    return source;
  }

  const handlePlay = async () => {
    const context = new AudioContext();
    const merger = context.createChannelMerger(2);

    const leftSource = leftFile && await createSource(context, leftFile, merger, Channel.Left);
    const rightSource = rightFile && await createSource(context, rightFile, merger, Channel.Right);

    merger.connect(context.destination);

    if (leftSource) leftSource.start();
    if (rightSource) rightSource.start();
  };

  return (
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
