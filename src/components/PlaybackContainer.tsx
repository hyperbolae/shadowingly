import React, {useEffect, useRef, useState} from 'react'
import {AudioStatus} from "../domain/AudioStatus";
import {AudioService} from "../services/audioService";
import {PlayButton} from "./playButton/PlayButton";
import {ProgressBar} from "./progressBar/ProgressBar";

interface PlaybackContainerProps {
  audioService: AudioService;
}

export function PlaybackContainer({audioService}: PlaybackContainerProps) {
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState(AudioStatus.Stopped);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const total = audioService.getPlaybackDuration() ?? 0;

  const animate = (time?: number) => {
    if (previousTimeRef.current !== undefined) {
      setCurrent(audioService.currentTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    console.log("ping");
    if (current > total) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setStatus(AudioStatus.Stopped);
    }
  }, [current, total]);

  const togglePlay = () => {
    if (status !== AudioStatus.Playing) {
      audioService.play();
      setStatus(AudioStatus.Playing);
      animate();
    } else {
      audioService.stop();
      setCurrent(0);
      setStatus(AudioStatus.Stopped);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
  }

  return (
    <>
      <ProgressBar endPercentage={1} currentPercentage={current/total}></ProgressBar>
      <PlayButton play={togglePlay} pause={togglePlay} status={status}></PlayButton>
    </>
  )
}


