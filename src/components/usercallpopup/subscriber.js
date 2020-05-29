import React from 'react';
import * as classsharedlocal from './classconst';
import { OTSubscriber } from 'opentok-react';

class subscriber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            audio: true,
            video: true
        };
    }
    setAudio = (audio) => {
        this.setState({ audio });
    }
    setVideo = (video) => {
        this.setState({ video });
    }
    onError = (err) => {
        this.setState({ error: `Failed to subscribe: ${err.message}` });
    }
    render() {
        return (
            <div className={classsharedlocal.subscriber}>
                {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <OTSubscriber
                    properties={{
                        subscribeToAudio: this.state.audio,
                        subscribeToVideo: this.state.video,
                        showControls: false
                    }}
                    onError={this.onError}
                />
            </div>
        );
    }
}
export default subscriber;
