import * as DOMPurify from "dompurify"
import { Chinese, Japanese } from "../../../domain/languages"
import { Sentence } from "../../../domain/sentence"
import * as styles from "./Dialogue.module.css"

interface DialogueProps {
  sentence: Sentence
  showTranscription: boolean
}

function getRenderedTranscription(languageCode: string, text: string, sanitizedHtml: string) {
  switch (languageCode) {
    case Chinese.code: {
      return (
        <>
          <p>{text}</p>
          <p className={styles.transcription} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></p>
        </>
      )
    }
    case Japanese.code: {
      return <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></p>
    }
    default: {
      return <p>{text}</p>
    }
  }
}

export function Dialogue({ sentence, showTranscription }: DialogueProps) {
  if (!showTranscription) {
    return <p>{sentence.text}</p>
  }

  const transcription = sentence.transcription

  if (transcription && transcription.html) {
    const sanitizedHtml = DOMPurify.sanitize(transcription.html)
    return getRenderedTranscription(sentence.languageCode, sentence.text, sanitizedHtml)
  }

  return <p>{sentence.text}</p>
}
