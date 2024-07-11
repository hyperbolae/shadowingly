import { useAppDispatch } from "../../../app/hooks"
import { setPlaybackFile } from "../../../app/playbackFileSlice"
import { setSentence } from "../../../app/sentenceSlice"
import { Sentence } from "../../../domain/sentence"
import { baseAudioUrl } from "../../../domain/tatoeba"
import { Dialogue } from "../../shared/dialogue/Dialogue"
import { PlayIcon } from "../../shared/icons/icons"
import * as styles from "./SearchItem.module.css"

export interface SearchItemProps {
  sentence: Sentence
}

export function SearchItem({ sentence }: SearchItemProps) {
  const dispatch = useAppDispatch()

  async function handleAudioPlay(sentence: Sentence) {
    const data = baseAudioUrl + sentence.audio.id
    const audio = new Audio(data)
    await audio.play()
  }

  async function handleAudioSelected(sentence: Sentence) {
    const url = baseAudioUrl + sentence.audio.id
    const response = await (await fetch(url)).blob()
    const audioFile = new File([response], "selected-audio.mp3", { type: "audio/mpeg" })

    dispatch(setPlaybackFile(audioFile))
    dispatch(setSentence(sentence))
  }

  return (
    <li className={styles.container}>
      <button className={styles.playButton} onClick={() => handleAudioPlay(sentence)}>
        <PlayIcon />
      </button>
      <div lang={sentence.languageCode} className={styles.sentence}>
        <Dialogue sentence={sentence} showTranscription={true} />
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAudioSelected(sentence)}>
          Select
        </button>
      </div>
    </li>
  )
}
