import {Channel} from "../domain/constants";
import {ReadFile} from "../utils/fileReader";
import {ISourceSetter} from "./audioServiceWriter";

const disconnect = (source: AudioNode | undefined) => source && source.disconnect();

const outputNumber = 0;

export interface IAudioService {
  play(): void;

  stop(): void;

  getPlaybackSource(): AudioSource;

  getRecordedSource(): AudioSource;

  getPlaybackChannel(): Channel;

  setPlaybackChannel(channel: Channel): Channel;
}

export class AudioService implements IAudioService, ISourceSetter {
  context: AudioContext;
  merger: ChannelMergerNode;
  playbackSource: AudioSource;
  recordedSource: AudioSource;
  playbackChannel = Channel.Dual;

  constructor(context: AudioContext = new AudioContext()) {
    this.context = context;
    this.merger = context.createChannelMerger(2);
    this.merger.connect(this.context.destination);

    this.playbackSource = undefined;
    this.recordedSource = undefined;
  }

  play = () => {
    this.connectDualChannels();
    if (this.playbackSource) this.playbackSource.start();
    if (this.recordedSource) this.recordedSource.start();
  }

  stop = () => {
    if (this.playbackSource) this.playbackSource.stop();
    if (this.recordedSource) this.recordedSource.stop();
  }

  getPlaybackSource = () => this.playbackSource;
  setPlaybackSource = async (file: File) => this.playbackSource = await this.createAudioSource(file);
  clearPlaybackSource = () => {
    this.stop();
    disconnect(this.playbackSource);
    this.playbackSource = undefined;
  }

  getRecordedSource = () => this.recordedSource;
  setRecordedSource = async (file: File) => this.recordedSource = await this.createAudioSource(file);
  clearRecordedSource = () => {
    this.stop();
    disconnect(this.recordedSource);
    this.recordedSource = undefined;
  }

  getPlaybackChannel = () => this.playbackChannel;
  setPlaybackChannel = (channel: Channel) => this.playbackChannel = channel;

  async createAudioSource(file: File) {
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    const arrayBuffer = await ReadFile(file);
    if (arrayBuffer) {
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      const source = this.context.createBufferSource();
      source.buffer = audioBuffer;

      return source;
    }
  }

  connectDualChannels() {
    if (this.playbackSource) this.playbackSource.connect(this.context.destination);
    if (this.recordedSource) this.recordedSource.connect(this.context.destination);
  }

  connectChannels() {
    disconnect(this.playbackSource);
    disconnect(this.recordedSource);
    disconnect(this.merger);

    if (this.playbackSource && this.recordedSource) {
      switch (this.playbackChannel) {
        case Channel.Left: {
          this.playbackSource.connect(this.merger, outputNumber, Channel.Left);
          this.recordedSource.connect(this.merger, outputNumber, Channel.Right);
          break;
        }
        case Channel.Right: {
          this.playbackSource.connect(this.merger, outputNumber, Channel.Right);
          this.recordedSource.connect(this.merger, outputNumber, Channel.Left);
          break;
        }
        case Channel.Dual:
          this.connectDualChannels();
      }
    } else {
      this.connectDualChannels();
    }
  }
}
