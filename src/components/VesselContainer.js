import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'

import ActorButtons from './ActorButtons';
import SensorRead from './sensor_read';

function VesselContainer(props) {

  console.log('VesselContainer Render')

  let vessel_name = props.vessel_name
  let title = props.vessel_name.replace(/_/g,' ')

  let v_dict
  let tar_temp
  try {
    v_dict = props.cache['VESSELS'][vessel_name]
    tar_temp = v_dict['Params']['tar_temp']
  } catch(err){}

  let index
  let s_name
  let s_rows = []
  for (let key in props.cache['VESSELS'][props.vessel_name]['Sensors']) {
    try{
      s_name = props.cache['VESSELS'][props.vessel_name]['Sensors'][key]['name']
      index = props.cache['VESSELS'][props.vessel_name]['Sensors'][key]['index']
    } catch(err){
      console.log('VesselContainer Error: sensor missing key')
      s_name = 'ERR'
    }
    if (key === '0') {
      s_rows.push(
        <Row className="align-items-center">
          <Col className = "align-items-center">
            <Row><center>{s_name}</center></Row>
            <Row className= "align-items-top"  style={{height: 45, fontSize: 28}}><SensorRead cache = {props.cache} index = {index}/></Row>
          </Col>
          <Col className="align-items-center">
            <Row style={{fontSize: 12}}><center>Target Temp</center></Row>
            <Row style={{fontSize: 16}}><center>{tar_temp}{" \xB0F"}</center></Row>
          </Col>
        </Row>
      )
    }
    else {
      s_rows.push(
      <Col>
        <Row><small>{s_name}</small></Row>
        <Row style={{fontSize: 20}}><center><SensorRead cache = {props.cache} index = {index}/></center></Row>
      </Col>
      )         
    }
}

  return(
    <Card className="vessel" border="dark" style={{ width: '20rem' }}>
      <Card.Header className= "align-items-top" style={{padding: 2, height: 45, fontSize: 25}}>{title}</Card.Header>
      <Card.Body className= "align-items-top" style={{padding: 2}}>
        <Container >
          {s_rows[0]}
          <Row>
            {s_rows[1]}
            {s_rows[2]}
          </Row>
        </Container>                
      </Card.Body>
      <Card.Footer className="text-muted">
        <ActorButtons vessel = {vessel_name} cache = {props.cache}/>
      </Card.Footer>
    </Card>
  )
}

export default VesselContainer;