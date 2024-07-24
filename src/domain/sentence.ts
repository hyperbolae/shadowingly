export interface Sentence {
  id: number
  text: string
  languageCode: string
  translation?: Translation
  transcription?: Transcription
  audio: Audio
}

export interface Transcription {
  text: string
  html?: string
  script: string
}

export interface Translation {
  text: string
}

export interface Audio {
  id: number
  author: string
  attributionUrl?: string
}
