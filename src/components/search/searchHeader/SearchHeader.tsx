import { useState } from "react"
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
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          lang={languageCode}
          placeholder="Search..."
          disabled={loading}
        />
        <button onClick={() => onSubmit(searchTerm)}>Search</button>
      </div>

      <LanguageDropdown languageCode={languageCode} onLanguageChange={onLanguageChange} />
      {/*<button className={styles.customSelect}>*/}
      {/*  <select className={styles.languages} value={languageCode} onChange={(e) => onLanguageChange(e.target.value)}>*/}

      {/*  </select>*/}
      {/*</button>*/}
    </div>
  )
}
