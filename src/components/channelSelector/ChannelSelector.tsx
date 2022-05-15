import React, {ChangeEvent, useState} from 'react'
import {IAudioService} from "../../services/audioService";
import {Channel} from "../../utils/constants";

interface ChannelSelectorProps {
  audioService: IAudioService
}

export function ChannelSelector(props: ChannelSelectorProps) {
  const [channel, setChannel] = useState(props.audioService.getPlaybackChannel());

  async function handleChannelChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedChannel: Channel = Number(event.target.value);
    props.audioService.setPlaybackChannel(selectedChannel);
    setChannel(selectedChannel);
  }

  return (
    <fieldset>
      <legend>Select playback channel</legend>
      <div>
        <input
          type="radio"
          id="mixed-channel"
          name="drone"
          value={Channel.Dual}
          checked={channel === Channel.Dual}
          onChange={handleChannelChange}/>
        <label htmlFor="mixed-channel">Mixed</label>
      </div>

      <div>
        <input
          type="radio"
          id="left-channel"
          name="drone"
          value={Channel.Left}
          checked={channel === Channel.Left}
          onChange={handleChannelChange}/>
        <label htmlFor="left-channel">Left</label>
      </div>

      <div>
        <input
          type="radio"
          id="right-channel"
          name="drone"
          value={Channel.Right}
          checked={channel === Channel.Right}
          onChange={handleChannelChange}/>
        <label htmlFor="louie">Right</label>
      </div>
    </fieldset>
  )
}
