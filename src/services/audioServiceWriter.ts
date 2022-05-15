type setter = (value: boolean) => void;

type audioServiceWriter = {
  setPlaybackSource: (file: File) => Promise<void>
  clearPlaybackSource: () => void
  setRecordingSource: (file: File) => Promise<void>
  clearRecordingSource: () => void
}

export interface ISourceSetter {
  setPlaybackSource(file: File): Promise<AudioSource>;

  clearPlaybackSource(): void;

  setRecordedSource(file: File): Promise<AudioSource>;

  clearRecordedSource(): void;
}

export function getAudioServiceWriter(audioService: ISourceSetter, setSelected: setter, setRecorded: setter): audioServiceWriter {
  const setPlaybackSource = async (file: File) => {
    await audioService.setPlaybackSource(file);
    setSelected(true);
  }

  const clearPlaybackSource = async () => {
    await audioService.clearPlaybackSource();
    setSelected(false);
  }

  const setRecordedSource = async (file: File) => {
    await audioService.setRecordedSource(file);
    setRecorded(true);
  }

  const clearRecordedSource = async () => {
    await audioService.clearRecordedSource();
    setSelected(false);
  }

  return {
    setPlaybackSource: setPlaybackSource,
    clearPlaybackSource: clearPlaybackSource,
    setRecordingSource: setRecordedSource,
    clearRecordingSource: clearRecordedSource
  }
}
