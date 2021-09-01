//import logo from './logo.svg';
import './App.css';
import React from 'react';
import socketio from "socket.io-client";

import Header from './components/Header';
import TempTable from './components/TempTable';
import FanTable from './components/FanTable';
import LogButtons from './components/LogButtons';
import NewAlert from './components/Alert';

const ENDPOINT = "http://192.168.0.31:5000";
const socket = socketio.connect(ENDPOINT);
export { socket };


function App() {
  return (
    <React.Fragment>
    <div className="App">
      <Header />
      <TempTable />
      <LogButtons />
      <FanTable />
    </div>
    <div className="Alerts">
          <NewAlert />
    </div>
    </React.Fragment>
  );
};

export default App;