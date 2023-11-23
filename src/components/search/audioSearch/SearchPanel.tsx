import React, { useCallback, useEffect, useState } from 'react'
import { searchUrl } from '../../../constants/tatoeba'
import { Sentence } from '../../../types/sentence'
import { parseTatoebaSentence, TatoebaResponse } from '../../../types/tatoeba'
import { SearchItem } from '../searchItem/SearchItem'


const defaultMinCount = 10

function getSearchUrl(searchTerm?: string, minCount?: number, maxCount?: number) {
  const url = new URL(searchUrl)
  const params = url.searchParams

  const minCountParam = minCount && minCount > 0 && minCount < 40 ? minCount : defaultMinCount
  params.append('word_count_min', minCountParam.toString())

  if (maxCount && maxCount > 0 && maxCount < 100) {
    params.append('word_count_max', maxCount.toString())
  }

  if (searchTerm && searchTerm.trim()) {
    params.append('query', searchTerm)
  }

  return url.toString()
}


export function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Sentence[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTatoebaData = useCallback(async () => {
    setLoading(true)
    const response = await fetch(searchUrl + getSearchUrl(searchTerm))
    const data: TatoebaResponse = await response.json()

    const sentences = data.results
      .filter(sentence => sentence.audios.length > 0)
      .map(parseTatoebaSentence)

    setResults(sentences)
    setLoading(false)
  }, [searchTerm])
  useEffect(() => {
    fetchTatoebaData()
  }, [fetchTatoebaData])

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={fetchTatoebaData}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((sentence, index) => <SearchItem sentence={sentence} key={index}/>)}
        </ul>
      )}
    </div>
  )
}
