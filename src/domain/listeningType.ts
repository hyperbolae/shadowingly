export const enum Mixed {
  PlaybackRight = 'playbackRight',
  RecordingRight = 'recordingRight',
  Both = 'both'
}

export const enum Single {
  PlaybackOnly = 'playbackOnly',
  RecordingOnly = 'recordingOnly'
}

export type ListeningType = Mixed | Single
