import { useState } from "react"
import { RefreshIcon, SearchIcon, UploadIcon } from "../../shared/icons/icons"
import { UploadInput } from "../../shared/uploadInput/UploadInput"
import { LanguageDropdown } from "../languageDropdown/LanguageDropdown"
import * as styles from "./SearchHeader.module.css"

export interface SearchHeaderProps {
  languageCode: string
  loading: boolean
  onSubmit: (searchTerm: string) => void
  onLanguageChange: (code: string) => void
}

export function SearchHeader({ languageCode, loading, onLanguageChange, onSubmit }: SearchHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <LanguageDropdown languageCode={languageCode} onLanguageChange={onLanguageChange} />
        <div className={styles.search}>
          <button className={styles.searchButton} onClick={() => onSubmit(searchTerm)}>
            <SearchIcon />
          </button>
          <input
            className={styles.searchInput}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            lang={languageCode}
            placeholder="Search"
            disabled={loading}
          />
        </div>
        <button className={styles.refreshButton} onClick={() => onSubmit(searchTerm)} title="Get new sentences">
          <RefreshIcon />
        </button>
      </div>
      <label className={styles.upload} htmlFor="search-upload">
        <UploadInput id="search-upload" />
        Upload an MP3 <UploadIcon />
      </label>
    </div>
  )
}
