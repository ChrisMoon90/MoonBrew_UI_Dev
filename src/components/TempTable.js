import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Set_Temp_Index from './TempIndexUpdater';
import { socket } from '../App';


function TempTable() {
  const [temps, setTemps] = useState("");
  const [temp_indexes, set_temp_indexes] = useState("");

  useEffect(() => {
    socket.on("connect", msg => {
      console.log("Connect to socket.io server!")
    });
    socket.on("temp_indexes", temp_indexes_in => {
      set_temp_indexes(temp_indexes_in);
      console.log("Temp_Indexes Received: ", temp_indexes_in)
    });
    socket.on("newtemps", temp_data => {
      setTemps(temp_data);
      console.log("Temps Received: ", temp_data);
    });
  }, []);
 
  const s0_index = temp_indexes["s0"];
  const Temp1 = temps[s0_index];
  const s1_index = temp_indexes["s1"];
  const Temp2 = temps[s1_index];
  const s2_index = temp_indexes["s2"];
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
              <td><Set_Temp_Index sensor = "s0" temp_indexes = {temp_indexes}/></td>
              <td>{Temp1 + " \xB0F"}</td>
              </tr>
              <tr>
              <td>2</td>
              <td>Meat Temp 1</td>
              <td><Set_Temp_Index sensor = "s1" temp_indexes = {temp_indexes} /></td> 
              <td>{Temp2 + " \xB0F"}</td>
              </tr>          
              <tr>
              <td>3</td>
              <td>Meat Temp 2</td>
              <td><Set_Temp_Index sensor = "s2" temp_indexes = {temp_indexes} /></td>
              <td>{Temp3 + " \xB0F"}</td>
              </tr>
          </tbody>
      </Table>
  )
}

export default TempTable;