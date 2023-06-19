import { Channel } from '../constants/channel'
import { ReadFile } from '../utils/fileReader'

const disconnect = (source: AudioNode | undefined) => source && source.disconnect()

const outputNumber = 0

export class AudioService {
  playbackChannel = Channel.Dual

  private startTime = 0
  private context: AudioContext
  private readonly merger: ChannelMergerNode
  private playbackSource: AudioSource
  private recordedSource: AudioSource
  private playbackBuffer: Buffer
  private recordedBuffer: Buffer
  private mediaRecorder: MediaRecorder | undefined = undefined

  get currentTime() {
    return this.context.currentTime - this.startTime
  }

  getPlaybackDuration = () => this.playbackBuffer?.duration
  getRecordingDuration = () => this.playbackBuffer?.duration

  constructor(context: AudioContext = new AudioContext()) {
    this.context = context
    this.merger = context.createChannelMerger(2)

    this.requestPermissions()
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.ondataavailable = blobEvent => {
          return this.constructBufferFromBlob(blobEvent.data)
        }
      }).catch(_ => {
      console.log('TODO fix or give error message?')
    })
  }

  record(onEndedListener?: (ev: Event) => void) {
    if (!this.mediaRecorder) {
      console.warn('Attempted to record before MediaRecorder was constructed. ' +
        'An AudioRecorder may not have initialized correctly.')
      return
    }

    this.stop()
    this.clearRecordedSource()
    this.playbackSource = this.createSource(this.playbackBuffer, onEndedListener)
    this.connectChannels()

    this.startTime = this.context.currentTime
    if (this.playbackSource) this.playbackSource.start()

    this.mediaRecorder.start()
  }

  start(onEndedListener?: (ev: Event) => void) {
    this.stop()
    this.playbackSource = this.createSource(this.playbackBuffer, onEndedListener)
    this.recordedSource = this.createSource(this.recordedBuffer)
    this.connectChannels()

    this.startTime = this.context.currentTime
    if (this.playbackSource) this.playbackSource.start()
    if (this.recordedSource) this.recordedSource.start()
  }

  stop() {
    try {
      if (this.mediaRecorder) this.mediaRecorder.stop()
      if (this.playbackSource) this.playbackSource.stop()
      if (this.recordedSource) this.recordedSource.stop()
    } catch (e) {
      // cannot call stop on an AudioSource that's not started
    }
  }

  async setPlaybackFile(file: File) {
    this.playbackBuffer = await this.createAudioBuffer(file)
  }

  private async setRecordedFile(file: File) {
    this.recordedBuffer = await this.createAudioBuffer(file)
  }

  private requestPermissions() {
    const constraints = { audio: true }
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  private async constructBufferFromBlob(rawAudio: Blob) {
    const blob = new Blob([rawAudio], { 'type': 'audio/ogg codecs=opus' })
    await this.setRecordedFile(new File([blob], 'recorded'))
  }

  private clearRecordedSource = () => {
    this.stop()
    disconnect(this.recordedSource)
    this.recordedSource = undefined
  }

  private async createAudioBuffer(file: File) {
    if (this.context.state === 'suspended') {
      await this.context.resume()
    }
    const arrayBuffer = await ReadFile(file)
    if (arrayBuffer) {
      return await this.context.decodeAudioData(arrayBuffer)
    }
  }

  private createSource(buffer: Buffer, onEndedListener?: (ev: Event) => void) {
    if (buffer) {
      const source = this.context.createBufferSource()
      source.buffer = buffer

      if (onEndedListener) (
        source.addEventListener('ended', onEndedListener)
      )

      return source
    }
  }

  private connectDualChannels() {
    if (this.playbackSource) this.playbackSource.connect(this.context.destination)
    if (this.recordedSource) this.recordedSource.connect(this.context.destination)
  }

  private connectChannels() {
    disconnect(this.playbackSource)
    disconnect(this.recordedSource)
    disconnect(this.merger)

    if (this.playbackSource && this.recordedSource) {
      switch (this.playbackChannel) {
        case Channel.Left: {
          this.playbackSource.connect(this.merger, outputNumber, Channel.Left)
          this.recordedSource.connect(this.merger, outputNumber, Channel.Right)
          this.merger.connect(this.context.destination)
          break
        }
        case Channel.Right: {
          this.playbackSource.connect(this.merger, outputNumber, Channel.Right)
          this.recordedSource.connect(this.merger, outputNumber, Channel.Left)
          this.merger.connect(this.context.destination)
          break
        }
        case Channel.Dual:
          this.connectDualChannels()
      }
    } else {
      this.connectDualChannels()
    }
  }
}

export class AudioServiceSingleton {
  static instance: AudioService

  static getInstance() {
    if (!AudioServiceSingleton.instance) {
      AudioServiceSingleton.instance = new AudioService()
    }

    return AudioServiceSingleton.instance
  }
}
