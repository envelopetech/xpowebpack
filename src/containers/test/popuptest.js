import React from 'react';
import { OTSession, preloadScript } from 'opentok-react';
import Publisher from '../../components/usercallpopup/publisher';
import { generate_opentokbox_token } from '../../actions/videocalling/dataactions'

class popuptest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            connected: false,
            opentok_token: null,
            opentok_sessionid: null
        };
        this.otPublisher = React.createRef();
        this.sessionEvents = {
            sessionConnected: () => {
                this.setState({ connected: true });
            },
            sessionDisconnected: () => {
                this.setState({ connected: false });
            }
        };
    }
    onError = (err) => {
        this.setState({ error: `Failed to connect: ${err.message}` });
    }
    endcallhandler = () => {
        this.otSession.sessionHelper.disconnect(this.state.opentok_sessionid)
    }
    componentDidMount() {
        this.setState({ loading: true })
        var data = generate_opentokbox_token()
        data.then(res => {
            if (res.data["error"] === undefined) {
                if (res.data[0] !== null && res.data[0] !== undefined && res.data[1] !== null && res.data[1] !== undefined) {
                    this.setState({
                        opentok_token: res.data[0],
                        opentok_sessionid: res.data[1],
                    });
                }
            }
        });
    }
    render() {
        return (
            <React.Fragment>
            {
                this.state.opentok_token !== null ?
                (
                    <OTSession
                    apiKey='46512372'
                    sessionId={this.state.opentok_sessionid}
                    token={this.state.opentok_token}
                    eventHandlers={this.sessionEvents}
                    onError={this.onError}
                    ref={instance => {
                        this.otSession = instance;
                    }}>
                    {this.state.error ? <div id="error">{this.state.error}</div> : null}
                    <Publisher />
                    </OTSession>
                ) : null
            }
            <button onClick={() => this.endcallhandler()}>
                End call
            </button>
            </React.Fragment>
        );
    }
}
export default preloadScript(popuptest);