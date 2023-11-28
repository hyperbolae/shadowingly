import { useState } from "react"
import { Language } from "../../../domain/languages"
import { LanguageDropdown } from "../languageDropdown/LanguageDropdown"
import styles from "./SearchHeader.module.css"

export interface SearchHeaderProps {
  language: Language
  loading: boolean
  onSubmit: (searchTerm: string) => void
  onLanguageChange: (languageCode: Language) => void
}

export function SearchHeader({ language, loading, onLanguageChange, onSubmit }: SearchHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          lang={language.code}
          placeholder="Search..."
          disabled={loading}
        />
        <button onClick={() => onSubmit(searchTerm)}>Search</button>
      </div>

      <LanguageDropdown language={language} onLanguageChange={onLanguageChange} />
      {/*<button className={styles.customSelect}>*/}
      {/*  <select className={styles.languages} value={languageCode} onChange={(e) => onLanguageChange(e.target.value)}>*/}

      {/*  </select>*/}
      {/*</button>*/}
    </div>
  )
}
