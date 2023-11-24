import React, { useCallback, useEffect, useState } from "react"
import { DefaultLanguage, Languages } from "../../../domain/languages"
import { Sentence } from "../../../domain/sentence"
import { parseTatoebaSentence, searchUrl, TatoebaResponse } from "../../../domain/tatoeba"
import { SearchItem } from "../searchItem/SearchItem"
import styles from "./SearchPanel.module.css"

const defaultMinCount = 10

function getSearchUrl(languageCode: string, searchTerm?: string, minCount?: number, maxCount?: number) {
  const url = new URL(searchUrl)
  const params = url.searchParams

  params.append("from", languageCode)

  const minCountParam = minCount && minCount > 0 && minCount < 40 ? minCount : defaultMinCount
  params.append("word_count_min", minCountParam.toString())

  if (maxCount && maxCount > 0 && maxCount < 100) {
    params.append("word_count_max", maxCount.toString())
  }

  if (searchTerm && searchTerm.trim()) {
    params.append("query", searchTerm)
  }

  return url.toString()
}

export interface SearchPanelProps {
  defaultLanguageCode?: string
}

export function SearchPanel(props: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<Sentence[]>([])
  const [loading, setLoading] = useState(false)
  const [languageCode, setLanguageCode] = useState(props.defaultLanguageCode || DefaultLanguage.code)

  const fetchTatoebaData = useCallback(async () => {
    setLoading(true)
    const tatoebaCode = Languages.find((lang) => lang.code === languageCode)?.tatoebaCode || DefaultLanguage.tatoebaCode
    const response = await fetch(searchUrl + getSearchUrl(tatoebaCode, searchTerm))
    const data: TatoebaResponse = await response.json()

    const sentences = data.results
      .filter((sentence) => sentence.audios.length > 0)
      .slice(0, 7)
      .map(parseTatoebaSentence)

    setResults(sentences)
    setLoading(false)
  }, [searchTerm, languageCode])
  useEffect(() => {
    fetchTatoebaData()
  }, [fetchTatoebaData])

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        lang={languageCode}
        placeholder="Search..."
      />
      <button onClick={fetchTatoebaData}>Search</button>
      <select value={languageCode} onChange={(e) => setLanguageCode(e.target.value)}>
        {Languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.sentences}>
          {results.map((sentence, index) => (
            <SearchItem sentence={sentence} key={index} />
          ))}
        </ul>
      )}
    </div>
  )
}
