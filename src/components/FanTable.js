import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import { socket } from '../App';
import FanStateButtons from './FanButtons';


function FanTable() {
  let isMounted = true;
  const [FanState, setFanState] = useState("");
  const [fan_indexes, set_fan_indexes] = useState("");

  useEffect(() => {
    socket.emit("fetch_fan_indexes")
    socket.emit("fetch_fan_states");

    socket.on("fan_states", FanState => {
        if (isMounted) {
            setFanState(FanState);
            console.log("FanState Updated: ", FanState);
        }
    });
    socket.on("fan_indexes", fan_indexes_in => {
      if (isMounted) {
        set_fan_indexes(fan_indexes_in);
        console.log("Fan_IndexesSet Received: ", fan_indexes_in)
      }
    });
    return () => { 
        isMounted = false;
        console.log('Unmounted FanStateButtons');      
    }; 
}, []); 

  return(
    <Card border="dark">
      <Card.Header><h3>Fan Controls</h3></Card.Header>
      <Card.Body>
        <Table striped bordered hover>              
            <thead>
                <tr>
                <th>#</th>
                <th>Fan Name</th>
                <th>Toggle State</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                <td>1</td>
                <td>Heating Fan</td>
                <td><FanStateButtons fanID = {fan_indexes['f0']} fan_states = {FanState} /></td>
                </tr>
                <tr>
                <td>2</td>
                <td>Convection Fan</td>
                <td><FanStateButtons fanID = {fan_indexes['f1']} fan_states = {FanState} /></td>
                </tr>          
                <tr>
                <td>3</td>
                <td>Pi Cooling Fan</td>
                <td><FanStateButtons fanID = {fan_indexes['f2']} fan_states = {FanState} /></td>
                </tr>
            </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default FanTable;