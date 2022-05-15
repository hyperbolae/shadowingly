import React from "react";
import './audioRecorder.css';

interface AudioRecorderProps {
    setRecorded(file: File): Promise<void>
}

interface AudioRecorderState {
    chunks: Blob[],
    recording: boolean
}

export class AudioRecorder extends React.Component<AudioRecorderProps, AudioRecorderState> {

    mediaRecorder: MediaRecorder | undefined = undefined;

    constructor(props: AudioRecorderProps) {
        super(props);
        this.state = {
            chunks: [],
            recording: false
        }
        this.requestPermissions()
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.onstop = () => this.constructBufferFromChunks();
                this.mediaRecorder.ondataavailable = blobEvent => {
                    this.setState({
                        chunks: [...this.state.chunks, blobEvent.data]
                    })
                }
            });
    }

    requestPermissions = () => {
        const constraints = {audio: true};
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    constructBufferFromChunks = async () => {
        const blob = new Blob(this.state.chunks, {'type': 'audio/ogg; codecs=opus'});
        await this.props.setRecorded(new File([blob], 'recorded'));
    }

    toggleIsRecording = () => {
        if (!this.mediaRecorder) {
            console.warn("Attempted to record before MediaRecorder was constructed. " +
                "An AudioRecorder may not have initialized correctly.")
            return;
        }
        if (this.state.recording) {
            this.mediaRecorder.stop();
        } else {
            this.mediaRecorder.start();
        }

        this.setState({
            recording: !this.state.recording
        })
    }

    render() {
        return (
            <div className={'audio-recorder'}>
                <button onClick={this.toggleIsRecording}
                        className={this.state.recording ? 'recording' : ''}>
                    {this.state.recording ? 'Stop' : 'Record'}
                </button>
            </div>
        );
    }
}
