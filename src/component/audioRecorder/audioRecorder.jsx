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

    play = () => {
        const context = new AudioContext();
        const audio = new Audio(this.state.audioSource);
        const track = context.createMediaElementSource(audio);
        const pannerOptions = { pan: 0 };
        const panner = new StereoPannerNode(context, pannerOptions);
        track.connect(panner).connect(context.destination);
        let startTime = document.getElementById("some-id").value;
        audio.currentTime = startTime;
        audio.play();
    }

    configureRecorder = (stream) => {
        this.setState({
            mediaRecorder: new MediaRecorder(stream)
        });
        this.state.mediaRecorder.onstop = () => {
            const blob = new Blob(this.state.chunks, { 'type' : 'audio/ogg; codecs=opus' });
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

    startRecording = () => {
        this.state.mediaRecorder.start();
    }

    stopRecording = () => {
        this.state.mediaRecorder.stop();
    }

    requestPermissions = () => {
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
                {this.state.audioSource ?
                    <div>
                        <button onClick={this.play}>Play</button>
                        <input id='some-id' type="range" min="1" max="10" />
                    </div>
                    :
                    ""
                }
            </div>
        );
    }
}
