import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAudioService } from '../../audioService/hooks'
import { AudioStatus } from '../../constants/audioStatus'
import { ProgressBar } from './ProgressBar'

export function ProgressBarContainer() {
  const [currentTime, setCurrentTime] = useState(0)
  const audioStatus = useSelector((state: RootState) => state.audio.status)
  const audioService = useAudioService()

  const requestRef = useRef<number>()
  const isAnimating = useRef<boolean>()

  const total = audioService.getPlaybackDuration() ?? 1

  function animate() {
    if (isAnimating.current) {
      setCurrentTime(audioService.getCurrentTime())
      requestRef.current = requestAnimationFrame(animate)
    }
  }

  function tryStartAnimating() {
    if (audioStatus === AudioStatus.Stopped && isAnimating.current) {
      isAnimating.current = false
    }

    if (audioStatus === AudioStatus.Stopped && currentTime !== 0) {
      setCurrentTime(0)
    }

    if ((audioStatus === AudioStatus.Playing) && !isAnimating.current) {
      isAnimating.current = true
      animate()
    }
  }

  useEffect(() => {
    if (currentTime > total) {
      isAnimating.current = false
    }
  }, [currentTime, total])

  tryStartAnimating()

  return (
    <>
      <ProgressBar endPercentage={1} currentPercentage={currentTime / total}></ProgressBar>
    </>
  )
}
