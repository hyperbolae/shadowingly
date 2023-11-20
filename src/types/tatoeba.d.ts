export interface TatoebaResponse {
  paging: Paging;
  results: Sentence[];
}

export interface Paging {
  Sentences: Sentences;
}

export interface Sentences {
  finder: string;
  page: number;
  current: number;
  count: number;
  perPage: number;
  start: number;
  end: number;
  prevPage: boolean;
  nextPage: boolean;
  pageCount: number;
  sort: string;
  direction: boolean;
  limit: null;
  sortDefault: boolean;
  directionDefault: boolean;
  scope: null;
  completeSort: any[];
}

export interface Sentence {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null;
  license: string;
  translations: Translation[][];
  transcriptions: Transcription[];
  audios: AudioSrc[];
  user: User;
  lang_name: string;
  dir: string;
  lang_tag: string;
  is_favorite: null;
  is_owned_by_current_user: boolean;
  permissions: null;
  max_visible_translations: number;
  current_user_review: null;
}

export interface User {
  username: string;
}

export interface AudioSrc {
  id: number;
  author: string;
  attribution_url: null;
  license: null;
}

export interface Transcription {
  id: number;
  sentence_id: number;
  script: string;
  text: string;
  user_id: null;
  needsReview: boolean;
  modified: string;
  user: null;
  readonly: boolean;
  type: string;
  html: string;
  markup: null;
  info_message: string;
}

export interface Translation {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null;
  transcriptions: any[];
  audios: AudioSrc[];
  isDirect: boolean;
  lang_name: string;
  dir: string;
  lang_tag: string;
}
