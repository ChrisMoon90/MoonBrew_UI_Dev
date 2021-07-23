//import logo from './logo.svg';
import './App.css';
import React from 'react';
import socketio from "socket.io-client";

import Header from './components/Header';
import MainTable from './components/Table';

const ENDPOINT = "http://192.168.0.31:5000";
const socket = socketio.connect(ENDPOINT);
export { socket };


function App() {
  return (
    <div className="App">
      <Header />
      <MainTable />
    </div>
  );
};

export default App;