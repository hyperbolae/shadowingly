import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useAudioService } from "../../../audioService/hooks";

function normalize_array(input: number[]) {
  let ratio = Math.max.apply(Math, input) / 100;
  let normalized: Array<number> = [];
  for (let i = 0; i < input.length; i++) {
    normalized.push(Math.round(input[i] / ratio));
  }
  return normalized;
}

function chunk_pulse_code_modulation(input: Float32Array, num_chunks: number) {
  let window_size = Math.floor(input!.length / num_chunks);
  let volume = [];

  for (let i = 0; i < num_chunks; i++) {
    let sum = 0;
    sum = input
      .subarray(i * window_size, (i + 1) * window_size)
      .reduce((acc: number, value: number) => acc + value, 0);
    sum /= window_size;
    volume.push(sum);
  }
  return volume;
}

export function Waveform() {
  const audioService = useAudioService();
  const set = useAppSelector((state) => state.playbackFile.loaded);
  useEffect(() => {
    let canvas = document.getElementById("waveform") as HTMLCanvasElement;
    canvas.style.width = "100%";
    let waveform_line_count = 50;
    canvas.width = canvas.offsetWidth;
    let context: any = canvas.getContext("2d")!;
    let piece_size = canvas.width / waveform_line_count;
    context.fillStyle = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--color-primary");
    let channel_data = audioService.playbackBuffer?.getChannelData(0);
    if (channel_data) {
      let volume = chunk_pulse_code_modulation(
        channel_data,
        waveform_line_count,
      );
      volume = normalize_array(volume);

      for (let i = 0; i < waveform_line_count; i++) {
        context.roundRect(
          i * piece_size,
          canvas.height / 2 - 0.25 * volume[i],
          piece_size * 0.9,
          0.5 * volume[i],
          10,
        );
      }
      context.fill();
    }
  }, [audioService.playbackBuffer]);
  return <canvas id="waveform" width="100%" height="150px"></canvas>;
}
