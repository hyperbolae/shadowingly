import { useAppDispatch } from '../../../app/hooks'
import { setPlaybackFile } from '../../../app/playbackFileSlice'
import { baseAudioUrl } from '../../../constants/tatoeba'
import { Sentence } from '../../../types/sentence'

export function SearchItem({sentence}: { sentence: Sentence }) {
  const dispatch = useAppDispatch()

  async function handleAudioPlay(sentence: Sentence) {
    const data = baseAudioUrl + sentence.audio.id
    const audio = new Audio(data)
    await audio.play()
  }

  async function handleAudioSelected(sentence: Sentence) {
    const url = baseAudioUrl + sentence.audio.id
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
