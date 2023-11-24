export interface Language {
  code: string
  tatoebaCode: string
  name: string
}

const Japanese: Language = { code: "ja", tatoebaCode: "jpn", name: "Japanese" }
const Chinese: Language = { code: "zh", tatoebaCode: "cmn", name: "Mandarin Chinese" }

export const DefaultLanguage = Japanese
export const Languages: Language[] = [Japanese, Chinese]
