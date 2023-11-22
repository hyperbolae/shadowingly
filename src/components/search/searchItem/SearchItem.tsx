import { useAppDispatch } from '../../../app/hooks'
import { setPlaybackFile } from '../../../app/playbackFileSlice'
import { baseAudioUrl } from '../../../constants/tatoeba'
import { Sentence } from '../../../types/tatoeba'


function getAudioUrl(sentence: Sentence) {
  if (sentence.audios.length > 0 && sentence.audios[0].id) {
    return baseAudioUrl + sentence.audios[0].id
  } else {
    return '' // todo handle this case
  }
}

export function SearchItem({sentence}: { sentence: Sentence }) {
  const dispatch = useAppDispatch()

  async function handleAudioPlay(sentence: Sentence) {
    const data = getAudioUrl(sentence)
    const audio = new Audio(data)
    await audio.play()
  }

  async function handleAudioSelected(sentence: Sentence) {
    const url = getAudioUrl(sentence)
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
