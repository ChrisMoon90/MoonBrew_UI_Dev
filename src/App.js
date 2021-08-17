//import logo from './logo.svg';
import './App.css';
import React from 'react';
import socketio from "socket.io-client";

import Header from './components/Header';
import MainTable from './components/Table';
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
      <MainTable />
      <LogButtons />
    </div>
    <div className="Alerts">
          <NewAlert />
    </div>
    </React.Fragment>
  );
};

export default App;