import React, { useCallback, useEffect, useState } from "react"
import { DefaultLanguage, Languages } from "../../../domain/languages"
import { Sentence } from "../../../domain/sentence"
import { parseTatoebaSentence, searchUrl, TatoebaResponse } from "../../../domain/tatoeba"
import { RefreshIcon } from "../../shared/icons/icons"
import { SearchHeader } from "../searchHeader/SearchHeader"
import { SearchItem } from "../searchItem/SearchItem"
import * as styles from "./SearchPanel.module.css"
import { getSearchUrl } from "./utils"
import { setTatoebaLanguage } from "../../../app/settingsSlice"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"

export function SearchPanel() {
  const [results, setResults] = useState<Sentence[]>([])
  const [loading, setLoading] = useState(true)
  const tatoebaLanguage = useAppSelector((state) => state.settings.tatoebaLanguage)
  const dispatch = useAppDispatch()
  const fetchTatoebaData = useCallback(async () => {
    setLoading(true)
    const tatoebaCode =
      Languages.find((lang) => lang.code === tatoebaLanguage)?.tatoebaCode || DefaultLanguage.tatoebaCode
    const response = await fetch(searchUrl + getSearchUrl(tatoebaCode))
    const data: TatoebaResponse = await response.json()

    const sentences = data.results
      .filter((sentence) => sentence.audios.length > 0)
      .slice(0, 7)
      .map(parseTatoebaSentence)

    setResults(sentences)
    setLoading(false)
  }, [tatoebaLanguage])

  useEffect(() => {
    fetchTatoebaData()
  }, [fetchTatoebaData])

  return (
    <div className={styles.container}>
      <SearchHeader
        languageCode={tatoebaLanguage}
        loading={loading}
        onSubmit={fetchTatoebaData}
        onLanguageChange={(event) => dispatch(setTatoebaLanguage(event.target.value))}
      />
      <ul className={styles.sentences}>
        {loading ? (
          <span className={styles.loadingSpinner}>
            <RefreshIcon />
          </span>
        ) : (
          results.map((sentence) => <SearchItem key={sentence.id} sentence={sentence} />)
        )}
      </ul>
    </div>
  )
}
