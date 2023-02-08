import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import PowerButton from './PowerButton';
import AutoButton from './AutoButton.js';

function VesselContainer(props) {
  let vessel_name = props.vessel_name
  let title = props.vessel_name.replace(/_/g,' ')
  let cache
  let tar_temp
  let s0
  let s0_name
  let s1
  let s1_name
  let s2
  let s2_name
  try {
    cache = props.cache
    tar_temp = props.cache['VESSELS'][vessel_name]['Params']['tar_temp']
    s0_name = cache['VESSELS'][vessel_name]['Sensors'][1]['name']
    s0 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][1]['index']]['cur_temp']
    s1_name = cache['VESSELS'][vessel_name]['Sensors'][2]['name']
    s1 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][2]['index']]['cur_temp']
    s2_name = cache['VESSELS'][vessel_name]['Sensors'][3]['name']
    s2 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][3]['index']]['cur_temp']
  } catch(err){console.log('Failed to Load VesselContainer Props')}

  return(
    <Card border="dark" style={{ width: '20rem' }}>
      <Card.Header style={{fontSize: 30}}>{title}</Card.Header>
      <Card.Body>
        <Container fluid>
          <Row className="align-items-center">
            <Col className="align-items-center">
              <Row><center>{s0_name}</center></Row>
              <Row className= "align-items-top"  style={{height: 60, fontSize: 30}}><center>{s0 + " \xB0F"}</center></Row>
            </Col>
            <Col className="align-items-center">
              <Row style={{fontSize: 12}}><center>Target Temp</center></Row>
              <Row style={{fontSize: 16}}><center>{tar_temp + " \xB0F"}</center></Row>
            </Col>
          </Row>
          <Row >
            <Col>
              <Row><small>{s1_name}</small></Row>
              <Row style={{fontSize: 20}}><center>{s1 + " \xB0F"}</center></Row>
            </Col>
            <Col>
              <Row><small>{s2_name}</small></Row>
              <Row style={{fontSize: 20}}><center>{s2 + " \xB0F"}</center></Row>
            </Col>         
          </Row>
        </Container>                
      </Card.Body>
      <Card.Footer className="text-muted">
        <Row>
          <Col><AutoButton vessel = {vessel_name} hwID = 'h0' cache = {cache} /></Col>
          <Col><PowerButton vessel = {vessel_name} hwID = 'h1' cache = {cache} /></Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default VesselContainer;