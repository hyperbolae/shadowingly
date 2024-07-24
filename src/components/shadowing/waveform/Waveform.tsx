import React from "react"
import { useEffect, useRef } from "react"
import { useAppSelector } from "../../../app/hooks"
import { useAudioService } from "../../../audioService/hooks"

function normalizeArray(input: number[]) {
  const ratio = Math.max.apply(Math, input) / 100
  const normalized: Array = []
  for (let i = 0; i < input.length; i++) {
    normalized.push(Math.round(input[i] / ratio))
  }
  return normalized
}

function chunkPulseCodeModulation(input: Float32Array, numChunks: number) {
  const windowSize = Math.floor(input!.length / numChunks)
  let volume = []

  for (let i = 0; i < numChunks; i++) {
    let sum = 0
    sum = input.subarray(i * windowSize, (i + 1) * windowSize).reduce((acc: number, value: number) => acc + value, 0)
    sum /= windowSize
    volume.push(sum)
  }
  return volume
}

export function Waveform() {
  const audioService = useAudioService()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const channelData = audioService.getPlaybackChannelData()
  useAppSelector((state) => state.playbackFile.loaded)

  useEffect(() => {
    let canvas = canvasRef.current
    if (!canvas || !channelData) {
      return
    }
    canvas.style.width = "100%"
    let waveformLineCount = 50
    canvas.width = canvas.offsetWidth
    const context: any = canvas.getContext("2d")!
    const pieceSize = canvas.width / waveformLineCount
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-primary")
    if (channelData) {
      let volume = chunkPulseCodeModulation(channelData, waveformLineCount)
      volume = normalizeArray(volume)

      for (let i = 0; i < waveformLineCount; i++) {
        context.roundRect(i * pieceSize, canvas.height / 2 - 0.25 * volume[i], pieceSize * 0.9, 0.5 * volume[i], 10)
      }
      context.fill()
    }
  }, [channelData])
  return <canvas ref={canvasRef} width="100%" height="150px"></canvas>
}
