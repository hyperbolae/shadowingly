import React, {ChangeEvent} from 'react'
import {IAudioService} from "../../services/audioService";

interface PlayProps {
  audioService: IAudioService
}

export function FileSelector(props: PlayProps) {
  return (
    <div>
      return <button onClick={props.audioService.play}></button>;
    </div>
  )
}
