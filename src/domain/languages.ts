export interface Language {
  code: string
  tatoebaCode: string
  name: string
  displayName: string
}

export const Japanese: Language = {
  code: "ja",
  tatoebaCode: "jpn",
  name: "Japanese",
  displayName: "日本語"
}

export const Chinese: Language = {
  code: "zh",
  tatoebaCode: "cmn",
  name: "Mandarin Chinese",
  displayName: "中文"
}

export const DefaultLanguage = Japanese
export const Languages: Language[] = [Japanese, Chinese]
