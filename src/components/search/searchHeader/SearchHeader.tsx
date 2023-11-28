import { useState } from "react"
import { RefreshIcon, SearchIcon } from "../../shared/icons/icons"
import { LanguageDropdown } from "../languageDropdown/LanguageDropdown"
import styles from "./SearchHeader.module.css"

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
        <button className={styles.refreshButton} onClick={() => onSubmit(searchTerm)}>
          <RefreshIcon />
        </button>
      </div>

      <LanguageDropdown languageCode={languageCode} onLanguageChange={onLanguageChange} />
    </div>
  )
}
