export interface Sentence {
  id: number
  text: string
  languageCode: string
  translation?: Translation
  transcription?: Transcription
  audio: Audio
}

interface Transcription {
  text: string
  html: string
  script: string
}

interface Translation {
  text: string
}

interface Audio {
  id: number
  author: string
  attribution_url?: string
}
