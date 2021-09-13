import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Set_Temp_Index from './TempIndexUpdater';
import { socket } from '../App';


function TempTableSet() {
  const [temps, setTemps] = useState("");
  const [temp_indexes, set_temp_indexes] = useState("");
  const s0_index = temp_indexes["s0"];
  const Temp1 = temps[s0_index];
  const s1_index = temp_indexes["s1"];
  const Temp2 = temps[s1_index];
  const s2_index = temp_indexes["s2"];
  const Temp3 = temps[s2_index];

  useEffect(() => {
    let isMounted = true;
    socket.emit("fetch_temp_indexes")

    socket.on("temp_indexes", temp_indexes_in => {
      if (isMounted) {
        set_temp_indexes(temp_indexes_in);
        console.log("Temp_Indexes Received: ", temp_indexes_in);
        socket.emit("fetch_temps");
      }
    });
    socket.on("newtemps", temp_data => {
      if (isMounted) {
        setTemps(temp_data);
        console.log("TempsSet Received: ", temp_data);
      }
    });

    return () => { 
      console.log('Unmounted TempTableSet');
      isMounted = false;
    }; 

  }, []);

  return(
    <div className="temptable">
      <h2>Temp Sensor Settings</h2>
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
    </div>
  )
}

export default TempTableSet;