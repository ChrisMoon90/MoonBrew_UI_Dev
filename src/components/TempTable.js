import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import { socket } from '../App';


function TempTable() {
  const [temps, setTemps] = useState("");
  const [temp_indexes, set_temp_indexes] = useState("");

  var s0_index = temp_indexes["s0"];
  var Temp1 = temps[s0_index];
  var s1_index = temp_indexes["s1"];
  var Temp2 = temps[s1_index];
  var s2_index = temp_indexes["s2"];
  var Temp3 = temps[s2_index];

  useEffect(() => {
    let isMounted = true;
    socket.emit("fetch_temp_indexes")

    socket.on("temp_indexes", temp_indexes_in => {
      if (isMounted) {
        set_temp_indexes(temp_indexes_in);
        console.log("Temp_Indexes Received: ", temp_indexes_in);
      }
    });
    socket.on("newtemps", temp_data => {
      if (isMounted) {
        setTemps(temp_data);
        console.log("Temps Received: ", temp_data);
      }
    });

    return () => { 
      console.log('Unmounted TempTable');
      isMounted = false;
    }; 
  }, []);
 
  return(
    <Card border="dark">
      <Card.Header><h3>Temperatures</h3></Card.Header>
      <Card.Body>
        <Table striped bordered hover>              
            <thead>
                <tr>
                <th>#</th>
                <th>Sensor Name</th>
                <th>Current Value</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                <td>1</td>
                <td>Smoker Temp</td>
                <td>{Temp1 + " \xB0F"}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Meat Temp 1</td>
                <td>{Temp2 + " \xB0F"}</td>
                </tr>          
                <tr>
                <td>3</td>
                <td>Meat Temp 2</td>
                <td>{Temp3 + " \xB0F"}</td>
                </tr>
            </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TempTable;