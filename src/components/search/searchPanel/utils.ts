import { searchUrl } from "../../../domain/tatoeba"

const defaultMinCount = 10

export function getSearchUrl(languageCode: string, searchTerm?: string, minCount?: number, maxCount?: number) {
  console.log(searchUrl)
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
