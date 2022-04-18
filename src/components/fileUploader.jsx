import React, { useState } from 'react';

export function FileUploader() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsFileSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handlePlay = () => {
    console.log(selectedFile);
    const reader = new FileReader();

    reader.readAsArrayBuffer(selectedFile);

    reader.onload = function() {
      const blob = new Blob([reader.result])

      const audioUrl = window.URL.createObjectURL(blob);
      let aud = new Audio(audioUrl);
      aud.play();
    }
  };

  return(
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
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
