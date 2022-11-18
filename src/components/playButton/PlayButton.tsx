import React from 'react'
import "../styles/Button.css"
import {AudioStatus} from "../../domain/AudioStatus";
import {PlayIcon, StopIcon} from "../icons/icons";

interface IconButtonProps {
  play(): void;
  pause(): void;
  status: AudioStatus;
}

function getIcon (status: AudioStatus) {
  switch(status) {
    case AudioStatus.Playing:
      return StopIcon;
    case AudioStatus.Paused:
      return PlayIcon;
    case AudioStatus.Stopped:
      return PlayIcon;
  }
}

export function PlayButton(props: IconButtonProps) {
  const Icon = getIcon(props.status);

  function handleClick() {
    switch(props.status) {
      case AudioStatus.Playing:
        props.pause();
        break;
      case AudioStatus.Paused:
        props.play();
        break;
      case AudioStatus.Stopped:
        props.play();
        break;
    }
  }

  return (
    <button className="round-button" onClick={handleClick}>
      <Icon></Icon>
    </button>
  )
}
