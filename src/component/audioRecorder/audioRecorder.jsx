import './audioRecorder.css';
import React from "react";

export class AudioRecorder extends React.Component {

    constructor(props) {
        super(props);
        this.requestPermissions();
        this.state = {
            recording: false,
            chunks : []
        }
    }

    configureRecorder = (stream) => {
        window.mediaRecorder = new MediaRecorder(stream);
        window.mediaRecorder.onstop = () => {
            const blob = new Blob(this.state.chunks, { 'type' : 'audio/ogg; codecs=opus' });
            console.log(blob)
            this.setState({
                recording_source: window.URL.createObjectURL(blob),
                chunks: []
            })
        }
        window.mediaRecorder.ondataavailable = (blobEvent) => {

          this.setState({
              chunks: [...this.state.chunks, blobEvent.data]
          })
        }
    }

    startRecording() {
        window.mediaRecorder.start();
    }

    stopRecording() {
        window.mediaRecorder.stop();
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
                <audio controls={true} src={this.state.recording_source}/>
            </div>
        );
    }
}
