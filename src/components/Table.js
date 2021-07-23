import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import SetIndex from './IndexUpdater';
import { socket } from '../App';


function MainTable() {
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
      console.log("Temps Received: ", temp_data);
    });
  }, []);
 
  const s0_index = indexes["s0"];
  const Temp1 = temps[s0_index];
  const s1_index = indexes["s1"];
  const Temp2 = temps[s1_index];
  const s2_index = indexes["s2"];
  const Temp3 = temps[s2_index];

  return(
      <Table striped bordered hover>              
          <thead>
              <tr>
              <th>#</th>
              <th>Sensor Name</th>
              <th>Sensor Select</th>
              <th>Current Value</th>
              </tr>
          </thead>
          <tbody>      
              <tr>
              <td>1</td>
              <td>Smoker Temp</td>
              <td><SetIndex sensor = "s0" indexes = {indexes}/></td>
              <td>{Temp1 + " \xB0F"}</td>
              </tr>
              <tr>
              <td>2</td>
              <td>Meat Temp 1</td>
              <td><SetIndex sensor = "s1" indexes = {indexes} /></td> 
              <td>{Temp2 + " \xB0F"}</td>
              </tr>          
              <tr>
              <td>3</td>
              <td>Meat Temp 2</td>
              <td><SetIndex sensor = "s2" indexes = {indexes} /></td>
              <td>{Temp3 + " \xB0F"}</td>
              </tr>
          </tbody>
      </Table>
  )
}

export default MainTable;