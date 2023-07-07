import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap';

import IndexUpdater from './IndexUpdater';
import NameUpdater from './NameUpdater';
import ParamUpdater from './ParamUpdater';
import AddRemove from './AddRemove'
import ActorType from './ActorType';


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
  for (let key in v_dict['Sensors']) {
    let num = Number(key) + 1
    let s_name = v_dict['Sensors'][key]['name'];
    let s_read = cache['SENSORS'][v_dict['Sensors'][key]['index']]['cur_read']
    let com_type = cache['SENSORS'][v_dict['Sensors'][key]['index']]['com_type']
    let unit
    let sval = cache['SENSORS'][v_dict['Sensors'][key]['index']]['dev_name']
    if (sval.search("Text") === Number(-1)){unit = " \xB0F"}
    else {unit = " SG"}
    s_rows.push(
      <tr key = {key}>
        <td>{num}</td>
        <td>{s_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td><IndexUpdater vessel = {vessel_name} hw_type = 'Sensor' devs = {sensors} hw_id = {key} v_dict = {v_dict}/></td>
        <td>{com_type}</td>
        <td>{s_read}{unit}</td>
      </tr>
    )
  }

  let a_rows = []
  for (let key in v_dict['Actors']) {
    let num = Number(key) + 1
    let a_name = v_dict['Actors'][key]['name'];
    let a_state = cache['ACTORS'][v_dict['Actors'][key]['index']]['state']
    let state_read
    if (a_state === false) {state_read = "OFF"} else {state_read = "ON"}
    a_rows.push(
      <tr key = {key}>
        <td>{num}</td>
        <td>{a_name} <NameUpdater hw_type = 'Actor' vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td><IndexUpdater vessel = {vessel_name} hw_type = 'Actor' devs = {actors} hw_id = {key} v_dict = {v_dict}/></td>
        <td><ActorType vessel = {vessel_name} hw_id = {key} v_dict = {v_dict}/></td>
        <td>{state_read}</td>
      </tr>
    )
  }

  return(
    <>
      <style type="text/css">
            {`
        .set-title {
          color: white;    
        }
        .set-cont {
          background-color: #707070;
        }
        `}
      </style>
      <Container className="square rounded-3 border border-dark border-3 set-cont">
        <Row className="set-title"><center><h2 className="display-6">{title}</h2></center></Row>
        <AddRemove vessel = {vessel_name} hw_type = 'Sensor'/>
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>          
            <thead>
                <tr>
                  <th>#</th>
                  <th>Sensor Name</th>
                  <th>Sensor Select</th>
                  <th>Com Type</th>
                  <th>Current Value</th>
                </tr>
            </thead>
            <tbody>      
                {s_rows}
            </tbody>
          </Table>
        </Row>
        <AddRemove vessel = {vessel_name} hw_type = 'Actor'/>
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>          
            <thead>
                 <tr>
                  <th>#</th>
                  <th>Actor Name</th>
                  <th>Actor Select</th>
                  <th>Type</th>
                  <th>Current State</th>
                </tr>
            </thead>
            <tbody>      
                {a_rows}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>   
            <thead>
                <tr>
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
      <br></br>
    </>
  )
}

export default VesselSetting;