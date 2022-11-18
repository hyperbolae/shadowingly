type setter = (value: boolean) => void;

type audioServiceHooks = {
  setPlaybackSource: (file: File) => Promise<void>
  clearPlaybackSource: () => void
  setRecordedSource: (file: File) => Promise<void>
  clearRecordedSource: () => void
}

export interface IAudioServiceSources {
  setPlaybackSource(file: File): Promise<void>;

  clearPlaybackSource(): void;

  setRecordedSource(file: File): Promise<void>;

  clearRecordedSource(): void;
}

export function getAudioServiceHooks(audioService: IAudioServiceSources, setSelected: setter, setRecorded: setter): audioServiceHooks {
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
    setRecordedSource: setRecordedSource,
    clearRecordedSource: clearRecordedSource
  }
}
