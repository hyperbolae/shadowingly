import { useEffect, useRef, useState } from "react"
import { Language, Languages } from "../../../domain/languages"
import { mergeStyles } from "../../../utils/styling"
import { LanguageIcon } from "../../shared/icons/icons"
import styles from "./LanguageDropdown.module.css"

export interface LanguageDropdownProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageDropdown({ language, onLanguageChange }: LanguageDropdownProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  const customSelect = mergeStyles(styles.customSelect, visible && styles.active)

  return (
    <div ref={ref} className={customSelect}>
      <button
        className={styles.selectButton}
        onClick={() => setVisible(!visible)}
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={visible}
        aria-controls="select-dropdown"
      >
        <LanguageIcon />
        {/*<span className={styles.selectValue}>{language.code.toUpperCase()}</span>*/}
        <span className={styles.arrow}></span>
      </button>
      <ul className={styles.selectDropdown} role="listbox">
        {Languages.map((lang, index) => (
          <li key={index}>
            <input
              type="radio"
              id={lang.code}
              value={lang.code}
              checked={lang.code === language.code}
              role="option"
              aria-selected={lang.code === language.code}
              onChange={() => onLanguageChange(lang)}
              onClick={() => setVisible(false)}
            />
            <label htmlFor={lang.code}>{lang.displayName}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
