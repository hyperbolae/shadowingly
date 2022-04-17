import './audioRecorder.css';
import React from "react";

export class AudioRecorder extends React.Component {

    constructor(props) {
        super(props);
        this.requestPermissions();
        this.state = {
            audioSource: null,
            chunks : [],
            mediaRecorder: null,
            recording: false
        }
    }

    configureRecorder = (stream) => {

        this.setState({
            mediaRecorder: new MediaRecorder(stream)
        });

        this.state.mediaRecorder.onstop = () => {
            const blob = new Blob(this.state.chunks, { 'type' : 'audio/ogg; codecs=opus' });
            console.log(blob)
            this.setState({
                audioSource: window.URL.createObjectURL(blob),
                chunks: []
            })
        }
        this.state.mediaRecorder.ondataavailable = (blobEvent) => {
          this.setState({
              chunks: [...this.state.chunks, blobEvent.data]
          })
        }
    }

    startRecording() {
        this.state.mediaRecorder.start();
    }

    stopRecording() {
        this.state.mediaRecorder.stop();
    }

    requestPermissions() {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints).then(this.configureRecorder,
            (e) => console.error(e));
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
                <button onClick={this.toggleIsRecording} className={this.state.recording? 'recording': ''}>
                    {this.state.recording ? 'Stop' : 'Record'}
                </button>
                <audio controls={true} src={this.state.audioSource}/>
            </div>
        );
    }
}
