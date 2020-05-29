import React from 'react';
import { preloadScript, createSession, OTPublisher, OTSubscriber } from 'opentok-react';
//import ConnectionStatus from './connectionstatus';
// import Publisher from './publisher';
// import Subscriber from './subscriber';
import socket from '../../actions/socket';
//import dateFns from "date-fns";
//import moment from 'moment'

class videocallcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [], client: socket(), endtime: null };

    this.publisherProperties = {
      audioFallbackEnabled: false,
      showControls: false
    };
    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('Publisher stream created!');
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!');
      }
    };
    this.subscriberProperties = {
      preferredFrameRate: 15,
      showControls: false
    };
    this.subscriberEventHandlers = {
      videoDisabled: event => {
        console.log('Subscriber video disabled!');
      },
      videoEnabled: event => {
        console.log('Subscriber video enabled!');
      }
    };
  }
  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: '46512372',
      sessionId: this.props.opentok_sessionid,
      token: this.props.opentok_token,
      onStreamsUpdated: streams => { this.setState({ streams }); }
    });
  }

  componentWillUnmount() {
    this.state.client.end_call_by_publisher()
    // setTimeout(() => {
    //   if (this.sessionHelper) {
    //     this.sessionHelper.disconnect();
    //     // var CurrentDate = moment();
    //     // let end_time = dateFns.getTime(dateFns.format(CurrentDate));
    //     // let displaytime = dateFns.format(end_time, 'H:mm')//24 Hours display       
    //     this.state.client.end_call_by_publisher()
    //   }
    // }, 1 * 60 * 1000) //15 * 60 * 1000

  }
  endcallhandler = () => {
    this.sessionHelper.disconnect();
    // var CurrentDate = moment();
    // let end_time = dateFns.getTime(dateFns.format(CurrentDate));
    // let displaytime = dateFns.format(end_time, 'H:mm')//24 Hours display
    this.state.client.end_call_by_publisher()

  }
  render() {    
    return (
      <React.Fragment>
        <OTPublisher session={this.sessionHelper.session}
          properties={this.publisherProperties}
          eventHandlers={this.publisherEventHandlers} />
        {this.state.streams.map(stream => {
          return (
            <OTSubscriber
              key={stream.id}
              session={this.sessionHelper.session}
              stream={stream}
              properties={this.subscriberProperties}
              eventHandlers={this.subscriberEventHandlers}
            />
          );
        })}
        <button onClick={() => this.endcallhandler()}>
          End call
            </button>
      </React.Fragment>
    );
  }
}
export default React.memo(preloadScript(videocallcomponent));


// setTimeout(() => { 
//   if (session) {
//     session.disconnect(); 
//   }
//   alert('Your call has ended after the 1 hour limit') 
// }, 600000)