//import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Dropdown from 'react-bootstrap/Dropdown';
import socketio from "socket.io-client";

const ENDPOINT = "http://192.168.0.31:5000"
const socket = socketio.connect(ENDPOINT);


function SetIndex (props) { 
  
  function handleUpdate(e, f) {
    const indexes = props.indexes
    console.log(indexes);
    console.log("Index Updates: ", e, " = ", f);
    indexes[e] = f;
    console.log(indexes);
    socket.emit("index_change", indexes)
  }

  return(
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Edit
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 0)}>1</Dropdown.Item>
          <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 1)}>2</Dropdown.Item>
          <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 2)}>3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}


function App() {
  const [temps, setTemps] = useState("");
  const [indexes, setIndexes] = useState("");

  useEffect(() => {
    socket.on("connect", msg => {
      console.log("Connect to socket.io server!")
    });
    socket.on("indexes", indexes_in => {
      setIndexes(indexes_in);
      console.log("Indexes Received: ", indexes_in)
    });
    socket.on("newtemps", temp_data => {
      setTemps(temp_data);
      console.log("Temps Received: ", temp_data)
    });
  }, []);

  const s0_index = indexes["s0"];
  const Temp1 = temps[s0_index];
  const s1_index = indexes["s1"];
  const Temp2 = temps[s1_index];
  const s2_index = indexes["s2"];
  const Temp3 = temps[s2_index];

  return (
    <div className="App">
      <header className="App-header">
        <Jumbotron>
          <h1>MOON BREW CO.</h1>
          <p>SMOKER PI LIVE FEED & COTROL PANEL</p>
          <p>Version 1.0.0</p>
        </Jumbotron>
      </header>
      
      <table class="table">              
        <thead>
          <tr>
            <th>#</th>
            <th>Sensor Name</th>
            <th>Sensor ID</th>
            <th>(toggle)</th>
            <th>Current Value</th>
          </tr>
        </thead>
        <tbody>          
          <tr>
            <td>1</td>
            <td>Smoker Temp</td>
            <td>{s0_index + 1}</td>
            <td><SetIndex sensor = "s0" indexes = {indexes} /></td>
            <td>{Temp1 + " \xB0F"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Meat Temp 1</td>
            <td>{s1_index + 1}</td>
            <td><SetIndex sensor = "s1" indexes = {indexes} /></td>        
            <td>{Temp2 + " \xB0F"}</td>
          </tr>          
          <tr>
            <td>3</td>
            <td>Meat Temp 2</td>
            <td>{s2_index + 1}</td>
            <td><SetIndex sensor = "s2" indexes = {indexes} /></td>
            <td>{Temp3 + " \xB0F"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;