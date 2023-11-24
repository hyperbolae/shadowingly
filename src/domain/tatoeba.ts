import { Sentence } from './sentence'

export const baseUrl = process.env.REACT_APP_TATOEBA_BASE_URL
export const searchUrl = baseUrl + '/api_v0/search?has_audio=yes&orphans=no&sort=random&to=eng&trans_filter=limit&trans_to=eng&unapproved=no'
export const baseAudioUrl = baseUrl + '/audio/download/'

export interface TatoebaResponse {
  paging: Paging
  results: TatoebaSentence[]
}

export interface Paging {
  Sentences: TatoebaSentences
}

export interface TatoebaSentences {
  finder: string
  page: number
  current: number
  count: number
  perPage: number
  start: number
  end: number
  prevPage: boolean
  nextPage: boolean
  pageCount: number
  sort: string
  direction: boolean
  limit: null
  sortDefault: boolean
  directionDefault: boolean
  scope: null
  completeSort: any[]
}

export interface TatoebaSentence {
  id: number
  text: string
  lang: string
  correctness: number
  script: null
  license: string
  translations: TatoebaTranslation[][]
  transcriptions: TatoebaTranscription[]
  audios: TatoebaAudioSrc[]
  user: TatoebaUser
  lang_name: string
  dir: string
  lang_tag: string
  is_favorite: null
  is_owned_by_current_user: boolean
  permissions: null
  max_visible_translations: number
  current_user_review: null
}

export interface TatoebaUser {
  username: string
}

export interface TatoebaAudioSrc {
  id: number
  author: string
  attribution_url?: string
  license: null
}

export interface TatoebaTranscription {
  id: number
  sentence_id: number
  script: string
  text: string
  user_id: null
  needsReview: boolean
  modified: string
  readonly: boolean
  type: string
  html: string
  markup: null
  info_message: string
}

export interface TatoebaTranslation {
  id: number
  text: string
  lang: string
  correctness: number
  script: null
  transcriptions: any[]
  audios: TatoebaAudioSrc[]
  isDirect: boolean
  lang_name: string
  dir: string

  lang_tag: string
}

export function parseTatoebaSentence(sentence: TatoebaSentence): Sentence {
  const transcription = sentence.transcriptions.length > 0 ? {
    text: sentence.transcriptions[0].text,
    html: sentence.transcriptions[0].html,
    script: sentence.transcriptions[0].script
  } : undefined
  const translation = sentence.translations[0].length > 0 ? { text: sentence.translations[0][0].text } : undefined

  return {
    id: sentence.id,
    text: sentence.text,
    translation: translation,
    transcription: transcription,
    languageCode: sentence.lang_tag,
    audio: {
      id: sentence.audios[0].id,
      author: sentence.audios[0].author,
      attribution_url: sentence.audios[0].attribution_url
    }
  }
}
