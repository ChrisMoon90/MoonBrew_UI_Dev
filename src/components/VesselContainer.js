import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import ActorButtons from './ActorButtons';

function VesselContainer(props) {
  let vessel_name = props.vessel_name
  let title = props.vessel_name.replace(/_/g,' ')
  let cache
  let tar_temp
  let v_dict
  try {
    cache = props.cache
    v_dict = cache['VESSELS'][vessel_name]
    tar_temp = v_dict['Params']['tar_temp']
  } catch(err){}

  let s_rows = []
  let s_name
  let s_read
  let sval
  let unit
  for (let key in v_dict['Sensors']) {
    try{
      s_name = v_dict['Sensors'][key]['name'];
      s_read = cache['SENSORS'][v_dict['Sensors'][key]['index']]['cur_read']
      sval = cache['SENSORS'][v_dict['Sensors'][key]['index']]['dev_name']
      if (sval.search("Text") === Number(-1)){unit = " \xB0F"}
        else {unit = " SG"}
    } catch(err){
      console.log('VesselContainer Error: key')
      s_name = 'ERR'
      s_read = 'ERR'
      unit = ''
    }

    if (key === '0') {
      s_rows.push(
        <Row className="align-items-center">
          <Col className="align-items-center">
            <Row><center>{s_name}</center></Row>
            <Row className= "align-items-top"  style={{height: 60, fontSize: 30}}><center>{s_read}{unit}</center></Row>
          </Col>
          <Col className="align-items-center">
            <Row style={{fontSize: 12}}><center>Target Temp</center></Row>
            <Row style={{fontSize: 16}}><center>{tar_temp}{unit}</center></Row>
          </Col>
        </Row>
      )
    }
    else {
      s_rows.push(
      <Col>
        <Row><small>{s_name}</small></Row>
        <Row style={{fontSize: 20}}><center>{s_read}{unit}</center></Row>
      </Col>
      )         
    }
  }

  return(
    <Card border="dark" style={{ width: '20rem' }}>
      <Card.Header style={{fontSize: 30}}>{title}</Card.Header>
      <Card.Body>
        <Container fluid>
          {s_rows[0]}
          <Row>
            {s_rows[1]}
            {s_rows[2]}
          </Row>
        </Container>                
      </Card.Body>
      <Card.Footer className="text-muted">
        <ActorButtons vessel = {vessel_name} cache = {cache} v_dict = {v_dict}/>
      </Card.Footer>
    </Card>
  )
}

export default VesselContainer;