import React, { useState } from 'react'
import { useAudioService } from '../../audioService/hooks'
import { ListeningType, Mixed, Single } from '../../constants/listeningType'
import { Comment, CommentLeft, CommentMultiple, CommentOff, CommentRight, Icon } from '../icons/icons'
import './ListeningTypeSelector.css'

const buttons = [
  { type: Single.RecordingOnly, Icon: Comment, title: 'Recording only' },
  { type: Mixed.PlaybackRight, Icon: CommentLeft, title: 'Recording on the left' },
  { type: Mixed.Both, Icon: CommentMultiple, title: 'Mixed' },
  { type: Mixed.RecordingRight, Icon: CommentRight, title: 'Recording on the right' },
  { type: Single.PlaybackOnly, Icon: CommentOff, title: 'No recording' }
]

export function ListeningTypeSelector() {
  const audioService = useAudioService()
  const [currentChannel, setCurrentChannel] = useState(audioService.listeningType)

  function handleChange(type: ListeningType) {
    audioService.listeningType = type
    setCurrentChannel(type)
  }

  function generateButton({ type, Icon, title }: { type: ListeningType, Icon: Icon, title: string }) {
    return (
      <span key={type}>
        <input
          type="radio"
          id={type}
          checked={currentChannel === type}
          onChange={() => handleChange(type)}
          title={title}
          className="channel-input"/>
        <label htmlFor={type} title={title} className="channel-button">
          <Icon/>
        </label>
      </span>
    )
  }

  return (// todo: add tooltip that explains channels
    <fieldset id="channel-container">
      <legend>Recording output channel</legend>
      <div className="channel-button-container">
        {buttons.map(generateButton)}
      </div>
    </fieldset>
  )
}
