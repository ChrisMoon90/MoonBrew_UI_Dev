import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Set_Fan_Index from './FanIndexUpdater';
import { socket } from '../App';



function FanTableSet() {
  let isMounted = true;

  const [fan_indexes, set_fan_indexes] = useState("");
  const [fan_states, set_fan_states] = useState("");

  useEffect(() => {
    socket.emit("fetch_fan_indexes")
    socket.emit("fetch_fan_states")

    socket.on("fan_indexes", fan_indexes_in => {
      if (isMounted) {
        set_fan_indexes(fan_indexes_in);
        console.log("Fan_IndexesSet Received: ", fan_indexes_in)
      }
    });
    socket.on("fan_states", fan_states_in => {
        if (isMounted) {
          set_fan_states(fan_states_in);
          console.log("Fan_States Received: ", fan_states_in)
        }
      });

    return () => { 
      console.log('Unmounted FanTableSet');
      isMounted = false;
    }
  }, []);
 
  const f0_index = fan_indexes["f0"];
  const FanState1 = fan_states[f0_index];

  const f1_index = fan_indexes["f1"];
  const FanState2 = fan_states[f1_index];

  const f2_index = fan_indexes["f2"];
  const FanState3 = fan_states[f2_index];

  return(
      <div className="fantableset">
        <h2>Fan Settings</h2>
        <Table striped bordered hover>              
            <thead>
                <tr>
                <th>#</th>
                <th>Fan Name</th>
                <th>Fan Select</th>
                <th>Fan State</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                <td>1</td>
                <td>Heating Fan</td>
                <td><Set_Fan_Index fanID = "f0" fan_indexes = {fan_indexes}/></td>
                <td>{FanState1}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Convection Fan</td>
                <td><Set_Fan_Index fanID = "f1" fan_indexes = {fan_indexes}/></td> 
                <td>{FanState2}</td>
                </tr>          
                <tr>
                <td>3</td>
                <td>Pi Fan</td>
                <td><Set_Fan_Index fanID = "f2" fan_indexes = {fan_indexes}/></td>
                <td>{FanState3}</td>
                </tr>
            </tbody>
        </Table>
      </div>
  )
}

export default FanTableSet;