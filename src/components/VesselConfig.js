import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap';

import IndexUpdater from './IndexUpdater';
import NameUpdater from './NameUpdater';
import ParamUpdater from './ParamUpdater';
import AddRemove from './AddRemove'
import ActorType from './ActorType';
import SensorRead from './sensor_read';


function VesselSetting(props) {
  let vessel_name = props.vessel_name
  let title = props.vessel_name.replace(/_/g,' ')
  let tar_temp
  let temp_tol
  let cache
  let v_dict
  let sensors
  let actors
  try {
    cache = props.cache
    sensors = cache['SENSORS']
    actors = cache['ACTORS']
    v_dict = cache['VESSELS'][vessel_name]
    tar_temp = v_dict['Params']['tar_temp']
    temp_tol = v_dict['Params']['temp_tol']
  } catch(err){}

  let s_rows = []
  let s_num
  let s_name
  let index
  let com_type
  for (let key in v_dict['Sensors']) {
    try{
      s_num = Number(key) + 1
      s_name = v_dict['Sensors'][key]['name'];
      index = v_dict['Sensors'][key]['index']
      com_type = cache['SENSORS'][v_dict['Sensors'][key]['index']]['com_type']
  } catch(err) {
    console.log('VesselSetting Error: key')
    s_num = 'ERR'
    s_name = 'ERR'
    com_type = 'ERR'
  }
    s_rows.push(
      <tr key = {key}>
        <td>{s_num}</td>
        <td>{s_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td><IndexUpdater vessel = {vessel_name} hw_type = 'Sensor' devs = {sensors} hw_id = {key} v_dict = {v_dict}/></td>
        <td>{com_type}</td>
        <td><SensorRead cache = {props.cache} index = {index}/></td>
      </tr>
    )
  }

  let a_rows = []
  let a_num
  let a_name
  let a_state
  let state_read
  for (let key in v_dict['Actors']) {
    try{
      a_num = Number(key) + 1
      a_name = v_dict['Actors'][key]['name'];
      a_state = cache['ACTORS'][v_dict['Actors'][key]['index']]['state']
      if (a_state === false) {state_read = "OFF"} else {state_read = "ON"}
    } catch(err) {
      console.log('VesselSetting Error: key')
      a_num = 'ERR'
      a_name = 'ERR'
      state_read = 'ERR'
    }
    a_rows.push(
      <tr key = {key}>
        <td>{a_num}</td>
        <td>{a_name} <NameUpdater hw_type = 'Actor' vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td><IndexUpdater vessel = {vessel_name} hw_type = 'Actor' devs = {actors} hw_id = {key} v_dict = {v_dict}/></td>
        <td><ActorType vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td>{state_read}</td>
      </tr>
    )
  }

  return(
    <>
    <div>
      <style type="text/css">
              {`
          tr {
            line-height: 20px;
            font-size: 14px;
        }
          `}
      </style>

      <Card border="dark">
        <Card.Header style={{padding: 5, height: 55, fontSize: 25}}><span >{title} Configuration</span></Card.Header>
        <Card.Body style={{padding: 0}}>
          <br></br>
          <Row style={{fontSize: 18}}><center>Sensors</center></Row>
          <AddRemove vessel = {vessel_name} hw_type = 'Sensor'/>
          <Container fluid style={{padding: 0}}>
          <Row>
            <Table striped bordered hover variant='light' responsive>          
              <thead>
                  <tr style={{lineHeight: .7}}>
                    <th>#</th>
                    <th>Name</th>
                    <th>Select</th>
                    <th>Coms</th>
                    <th>Value</th>
                  </tr>
              </thead>
              <tbody>      
                  {s_rows}
              </tbody>
            </Table>
          </Row>
          <br></br>
          <Row style={{fontSize: 18}}><center>Actors</center></Row>
          <AddRemove vessel = {vessel_name} hw_type = 'Actor'/>
          <Row>
            <Table striped bordered hover size='sm5' variant='light' responsive>          
              <thead>
                  <tr style={{lineHeight: .7}}>
                    <th>#</th>
                    <th>Name</th>
                    <th>Select</th>
                    <th>Type</th>
                    <th>State</th>
                  </tr>
              </thead>
              <tbody>      
                  {a_rows}
              </tbody>
            </Table>
          </Row>
          <br></br>
          <Row style={{padding: 5, fontSize: 18}}><center>Auto Settings</center></Row>
          <br></br>
          <Row>
            <Table striped bordered hover size='sm5' variant='light' responsive>   
              <thead>
                  <tr style={{lineHeight: .7}}>
                    <th>Setting</th>
                    <th>Value</th>
                  </tr>
              </thead>       
              <tbody>      
                  <tr>
                    <td>Target Temp</td>
                      <td>{tar_temp} <ParamUpdater param_type = 'tar_temp' vessel = {vessel_name} v_dict = {v_dict}/></td>
                  </tr>
                  <tr>
                    <td>Temp Tollerance</td>
                    <td>{temp_tol} <ParamUpdater param_type = 'temp_tol' vessel = {vessel_name} v_dict = {v_dict}/></td>
                  </tr>          
              </tbody>
            </Table>
          </Row>
          </Container>
        </Card.Body>
      </Card>
      <br></br>
    </div>
    </ >
  )
}

export default VesselSetting