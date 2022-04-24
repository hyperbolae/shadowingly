import React from "react";
import './audioRecorder.css';

export class AudioRecorder extends React.Component {

    constructor(props) {
        super(props);
        const context = new AudioContext();
        this.state = {
            audioBuffer: null,
            context,
            chunks : [],
            recording: false
        }
        this.requestPermissions()
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                this.startRecording = () => mediaRecorder.start();
                this.stopRecording = () => mediaRecorder.stop();
                mediaRecorder.onstop = () => this.constructBufferFromChunks(context);
                mediaRecorder.ondataavailable = blobEvent => {
                    this.setState({
                        chunks: [...this.state.chunks, blobEvent.data]
                    })
                }
            });
    }

    requestPermissions = () => {
        const constraints = { audio: true };
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    constructBufferFromChunks = context => {
        const blob = new Blob(this.state.chunks, {'type': 'audio/ogg; codecs=opus'});
        let fileReader = new FileReader();
        fileReader.onloadend = () => {
            const arrayBuffer = fileReader.result;
            context.decodeAudioData(arrayBuffer, (audioBuffer) => {
                this.setState({audioBuffer, chunks: []})
            })
        }
        fileReader.readAsArrayBuffer(blob);
    }

    play = () => {
        let source = this.state.context.createBufferSource();
        source.buffer = this.state.audioBuffer;
        source.connect(this.state.context.destination);
        source.start();
    }

    toggleIsRecording = () => {
        if (this.state.recording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }

        this.setState({
            recording: !this.state.recording
        })
    }

    render() {
        return (
            <div className={'audio-recorder'}>
                <button onClick={this.toggleIsRecording}
                    className={this.state.recording? 'recording': ''}>
                    {this.state.recording ? 'Stop' : 'Record'}
                </button>
                {this.state.audioBuffer ?
                    <div>
                        <button onClick={this.play}>Play</button>
                    </div>
                    :
                    ""
                }
            </div>
        );
    }
}
