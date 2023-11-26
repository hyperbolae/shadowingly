import { useState } from "react"
import { Languages } from "../../../domain/languages"
import styles from "./SearchHeader.module.css"

export interface SearchHeaderProps {
  languageCode: string
  loading: boolean
  onSubmit: (searchTerm: string) => void
  onLanguageChange: (languageCode: string) => void
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
      <div>
        <select value={languageCode} onChange={(e) => onLanguageChange(e.target.value)}>
          {Languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
