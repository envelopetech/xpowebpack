import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { socketendpoint } from '../../shared/utility'
import Popuptest from './popuptest';

class videocallingtest extends Component {
  constructor() {
    super();
    this.state = {
      feed_data: null,
      openpopup: false
    };
  }
  componentDidMount() {
    const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
    socket.on('get_caller_detail', (data) => {
      this.setState({ openvideopopup: true, first_name: data[0]["first_name"], last_name: data[0]["last_name"] })
    })
    socket.on('closevideocallpopup', () => {
      this.setState({ openvideopopup: false })
    })
    socket.on('show_notification', (data) => {
    })
  }
  componentWillUnmount() {
    const socket = socketIOClient(socketendpoint, { 'transports': ['websocket', 'polling'] });
    socket.off("get_data");
    socket.off("closevideocallpopup");
    socket.off("show_notification");
  }
  onchange = (e) => {
    this.setState({
      feed_data: e.target.value
    });
  }
  savefeedpost = () => {
    //const socket = socketIOClient(socketendpoint, {'transports': ['websocket', 'polling']});
    //socket.emit('save_feed_post', this.state.feed_data)
    this.setState({ openpopup: true })
  }
  closeapplymodalhandler = () => {
    this.setState({ openpopup: false })
  }
  render() {
    return (
      <React.Fragment>       
          <Popuptest></Popuptest>       
        <div style={{ textAlign: "center" }}>
          <input type="text" onChange={this.onchange}></input> <button onClick={this.savefeedpost}>Save</button>
        </div>
      </React.Fragment>
    )
  }
}
export default videocallingtest;