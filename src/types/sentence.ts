export interface Sentence {
  id: number
  text: string
  translation?: Translation
  transcription?: Transcription
  audio: Audio
}

interface Transcription {
  text: string
  html: string
}

interface Translation {
  text: string
}

interface Audio {
  id: number
  author: string
  attribution_url?: string
}
