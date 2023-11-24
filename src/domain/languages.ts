export interface Language {
  code: string
  tatoebaCode: string
  name: string
}

export const Japanese: Language = { code: "ja", tatoebaCode: "jpn", name: "Japanese" }
export const Chinese: Language = { code: "zh", tatoebaCode: "cmn", name: "Mandarin Chinese" }

export const DefaultLanguage = Japanese
export const Languages: Language[] = [Japanese, Chinese]
