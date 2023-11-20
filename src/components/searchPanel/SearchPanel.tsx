import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPlaybackFile } from '../../app/playbackFileSlice'
import { Sentence, TatoebaResponse } from '../../types/tatoeba'


const baseUrl = 'https://shadowingly-dmhndccqgwe6asb5.z01.azurefd.net/en'
const searchUrl = baseUrl + '/api_v0/search?from=jpn&has_audio=yes&orphans=no&sort=random&to=eng&trans_filter=limit&trans_to=eng&unapproved=no'
const baseAudioUrl = baseUrl + '/audio/download/'

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

function getAudioUrl(sentence: Sentence) {
  if (sentence.audios.length > 0 && sentence.audios[0].id) {
    return baseAudioUrl + sentence.audios[0].id
  } else {
    return '' // todo handle this case
  }
}

function SearchItem({sentence}: { sentence: Sentence }) {
  const dispatch = useDispatch()

  async function handleAudioPlay(sentence: Sentence) {
    const data = getAudioUrl(sentence)
    const audio = new Audio(data)
    await audio.play()
  }

  async function handleAudioSelected(sentence: Sentence) {
    const url = getAudioUrl(sentence)
    const response = await (await fetch(url)).blob()

    const audioFile = new File([response], 'selected-audio.mp3', {type: 'audio/mpeg'})

    dispatch(setPlaybackFile(audioFile))
  }

  return (
    <li>
      {sentence.text}
      <button onClick={() => handleAudioPlay(sentence)}>Play</button>
      <button onClick={() => handleAudioSelected(sentence)}>Select</button>
    </li>
  )
}


export function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Sentence[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTatoebaData = useCallback(async () => {
    setLoading(true)
    const response = await fetch(searchUrl + getSearchUrl(searchTerm))
    const data: TatoebaResponse = await response.json()
    setResults(data.results)
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
