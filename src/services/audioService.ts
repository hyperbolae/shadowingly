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
  playbackBuffer: Buffer;
  recordedBuffer: Buffer;
  playbackChannel = Channel.Dual;

  constructor(context: AudioContext = new AudioContext()) {
    this.context = context;
    this.merger = context.createChannelMerger(2);
  }

  play = () => {
    this.stop();
    this.playbackSource = this.createSource(this.playbackBuffer);
    this.recordedSource = this.createSource(this.recordedBuffer);
    this.connectChannels();

    if (this.playbackSource) this.playbackSource.start();
    if (this.recordedSource) this.recordedSource.start();
  }

  stop = () => {
    try {
      if (this.playbackSource) this.playbackSource.stop();
      if (this.recordedSource) this.recordedSource.stop();
    } catch (e) {
      // cannot call stop on an AudioSource that's not started
    }
  }

  getPlaybackSource = () => this.playbackSource;
  setPlaybackSource = async (file: File) => {
    this.playbackBuffer = await this.createAudioBuffer(file);
    this.playbackSource = this.createSource(this.playbackBuffer);
  }
  clearPlaybackSource = () => {
    this.stop();
    disconnect(this.playbackSource);
    this.playbackSource = undefined;
  }

  getRecordedSource = () => this.recordedSource;
  setRecordedSource = async (file: File) => {
    this.recordedBuffer = await this.createAudioBuffer(file);
    this.recordedSource =  this.createSource(this.recordedBuffer);
  }
  clearRecordedSource = () => {
    this.stop();
    disconnect(this.recordedSource);
    this.recordedSource = undefined;
  }

  getPlaybackChannel = () => this.playbackChannel;
  setPlaybackChannel = (channel: Channel) => this.playbackChannel = channel;

  async createAudioBuffer(file: File) {
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    const arrayBuffer = await ReadFile(file);
    if (arrayBuffer) {
      return await this.context.decodeAudioData(arrayBuffer);
    }
  }

  createSource(buffer: Buffer) {
    if (buffer) {
      const source = this.context.createBufferSource();
      source.buffer = buffer;
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
          this.merger.connect(this.context.destination);
          break;
        }
        case Channel.Right: {
          this.playbackSource.connect(this.merger, outputNumber, Channel.Right);
          this.recordedSource.connect(this.merger, outputNumber, Channel.Left);
          this.merger.connect(this.context.destination);
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
