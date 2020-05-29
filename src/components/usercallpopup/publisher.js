import React from 'react';
import { OTPublisher } from 'opentok-react';
import * as classsharedlocal from './classconst';

class publisher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            audio: true,
            video: true,
            videoSource: 'camera'
        };
        this.publisherEventHandlers = {
            accessDenied: () => {
                console.log('User denied access to media source');
            },
            streamCreated: () => {
                console.log('Publisher stream created');
            },
            streamDestroyed: ({ reason }) => {
                console.log(`Publisher stream destroyed because: ${reason}`);
            },
        };
    }
    setAudio = (audio) => {
        this.setState({ audio });
    }
    setVideo = (video) => {
        this.setState({ video });
    }
    changeVideoSource = (videoSource) => {
        (this.state.videoSource !== 'camera') ? this.setState({ videoSource: 'camera' }) : this.setState({ videoSource: 'screen' })
    }
    onError = (err) => {
        this.setState({ error: `Failed to publish: ${err.message}` });
    }
    render() {
        return (
            <div className={classsharedlocal.publisher}>
                {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <OTPublisher
                    properties={{
                        publishAudio: this.state.audio,
                        publishVideo: this.state.video,
                        videoSource: this.state.videoSource === 'screen' ? 'screen' : undefined
                    }}
                    eventHandlers={this.publisherEventHandlers}
                    onError={this.onError}
                />
            </div>
        )
    }
}
export default publisher;