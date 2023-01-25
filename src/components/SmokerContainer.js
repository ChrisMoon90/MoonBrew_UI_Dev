import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import PowerButton from './PowerButton';
import AutoButton from './AutoButton.js';


function SmokerContainer(props) {
  // const [cache, set_cache] = useState("")
  let cache
  let tar_temp
  let s0_index
  let Temp1
  let s1_index
  let Temp2
  let s2_index
  // const [Temp3, set_Temp3] = useState ("")
  let Temp3
  try {
    cache = props.cache;
    console.log(JSON.stringify(cache['HARDWARE']))
    tar_temp = props.cache['SYSTEM']['Tar_Temp']
    s0_index = cache['VESSELS']['Smoker']['indexes']["s0"]
    Temp1 = cache['SENSORS'][s0_index]['cur_temp']
    s1_index = cache['VESSELS']['Smoker']['indexes']["s1"]
    Temp2 = cache['SENSORS'][s1_index]['cur_temp']
    s2_index = cache['VESSELS']['Smoker']['indexes']['s2']
    Temp3 = cache['SENSORS'][s2_index]['cur_temp']
    console.log('Temp1: ', Temp1)
  } catch(err){console.log('Failed Smoker Container')}

  return(
    <Card border="dark">
      <Card.Header><h3>Smoker</h3></Card.Header>
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
                  <td>
                  <Container fluid>
                    <Row md="auto">
                      <Col md="auto"><AutoButton vessel = 'Smoker' hwID = 'h0' cache = {cache} /></Col>
                      <Col md="auto">
                        <Row md="auto"><small>Target Temp:</small></Row>
                        <Row ><small><strong>{tar_temp}</strong></small></Row>
                      </Col>
                    </Row>
                  </Container>
                  </td>
                </tr>
                <tr>
                <td>2</td>
                <td>Convection Fan</td>
                <td><PowerButton vessel = 'Smoker' hwID = 'h1' cache = {cache} /></td>
                </tr>          
            </tbody>
        </Table>
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

export default SmokerContainer;