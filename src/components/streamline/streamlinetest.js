import React, { Component } from 'react';

import { StreamApp, StatusUpdateForm, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';


export default class streamlinetest extends Component {
    render() {
        let userToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZDNkN2ZlM2ItMjI5Zi00OTJjLWI4YTctNDc5NWFiY2NhMDU0In0.QQynyzvJ4JbKF_gTVdlAi2M0GjNStAYbVJ0Li439-rI"
      return (
        <div style={{ width: '600px', margin: '0 auto' }}>
          <StreamApp
            apiKey="cpgppgpbrh9a"
            appId="45932"
            token={userToken}
          >
            <StatusUpdateForm />
            <FlatFeed feedGroup="user" notify />
          </StreamApp>
        </div>
      );
    }
  }