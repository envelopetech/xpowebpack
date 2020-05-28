import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as classshared from './classConst';
import socket from './socket'; 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client: socket()
    }
  }

  componentDidMount() {
    this.state.client.test();
  }
  


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className={classshared.test}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }


}

export default App;
