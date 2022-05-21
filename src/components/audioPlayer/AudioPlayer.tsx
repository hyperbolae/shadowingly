import React from 'react'
import {IAudioService} from "../../services/audioService";

interface AudioPlayerProps {
  audioService: IAudioService
}

export function AudioPlayer(props: AudioPlayerProps) {
  return (
    <div>
      <button onClick={props.audioService.play}>Play audio</button>
    </div>
  )
}
