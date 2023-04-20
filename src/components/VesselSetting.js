import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap';

import IndexUpdater from './IndexUpdater';
import NameUpdater from './NameUpdater';
import ParamUpdater from './ParamUpdater';


function VesselSetting(props) {
  let vessel_name = props.vessel_name
  let title = props.vessel_name.replace(/_/g,' ')
  let tar_temp
  let temp_tol
  let s0
  let s0_name
  let s1
  let s1_name
  let s2
  let s2_name
  let h0_name
  let h0_state
  let h1_name
  let h1_state
  let cache
  let v_dict
  let sensors
  let actors
  try {
    cache = props.cache
    sensors = cache['SENSORS']
    actors = cache['ACTORS']
    v_dict = props.cache['VESSELS'][vessel_name]
    if (cache['VESSELS'][vessel_name]['Sensors'][1]['index'] === 'None') {s0_name = ''; s0 = ''} 
      else {s0_name = cache['VESSELS'][vessel_name]['Sensors'][1]['name'];
            s0 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][1]['index']]['cur_temp']}
    if (cache['VESSELS'][vessel_name]['Sensors'][2]['index'] === 'None') {s1_name = ''; s1 = ''}
      else {s1_name = cache['VESSELS'][vessel_name]['Sensors'][2]['name'];
            s1 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][2]['index']]['cur_temp']}
    if (cache['VESSELS'][vessel_name]['Sensors'][3]['index'] === 'None') {s2_name = ''; s2 = ''}
      else {s2_name = cache['VESSELS'][vessel_name]['Sensors'][3]['name'];
            s2 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][3]['index']]['cur_temp']}
    if (cache['VESSELS'][vessel_name]['Actors'][1]['index'] === 'None') {h0_name = ''; h0_state = ''}
      else {h0_name = cache['VESSELS'][vessel_name]['Actors'][1]['name'];
            h0_state = cache['ACTORS'][cache['VESSELS'][vessel_name]['Actors'][1]['index']]['state']}
    if (cache['VESSELS'][vessel_name]['Actors'][2]['index'] === 'None') {h1_name = ''; h1_state = ''}
      else {h1_name = cache['VESSELS'][vessel_name]['Actors'][2]['name'];
            h1_state = cache['ACTORS'][cache['VESSELS'][vessel_name]['Actors'][2]['index']]['state']}
    tar_temp = props.cache['VESSELS'][vessel_name]['Params']['tar_temp']
    temp_tol = props.cache['VESSELS'][vessel_name]['Params']['temp_tol']
  } catch(err){console.log('Failed to Load VesselSetting Props')}

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
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>          
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
                <td>{s0_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id='1' v_dict = {v_dict}/></td>
                <td><IndexUpdater vessel = {vessel_name} hw_type = 'Sensor' devs = {sensors} hw_id = '1' v_dict = {v_dict}/></td>
                <td>{s0 + " \xB0F"}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>{s1_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id='2' v_dict = {v_dict}/></td>
                <td><IndexUpdater vessel = {vessel_name} hw_type = 'Sensor' devs = {sensors} hw_id = '2' v_dict = {v_dict}/></td> 
                <td>{s1 + " \xB0F"}</td>
                </tr>          
                <tr>
                <td>3</td>
                <td>{s2_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id='3' v_dict = {v_dict}/></td>
                <td><IndexUpdater vessel = {vessel_name} hw_type = 'Sensor' devs = {sensors} hw_id = '3' v_dict = {v_dict}/></td>
                <td>{s2 + " \xB0F"}</td>
                </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>          
            <thead>
                <tr>
                <th>#</th>
                <th>Actor Name</th>
                <th>Actor Select</th>
                <th>Current State</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                <td>1</td>
                <td>{h0_name} <NameUpdater hw_type = 'Actor' vessel = {vessel_name} hw_id='1' v_dict = {v_dict}/></td>
                <td><IndexUpdater vessel = {vessel_name} hw_type = 'Actor' devs = {actors} hw_id = '1' v_dict = {v_dict}/></td>
                <td>{h0_state}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>{h1_name} <NameUpdater hw_type = 'Actor' vessel = {vessel_name} hw_id='2' v_dict = {v_dict}/></td>
                <td><IndexUpdater vessel = {vessel_name} hw_type = 'Actor' devs = {actors} hw_id = '2' v_dict = {v_dict}/></td> 
                <td>{h1_state}</td>
                </tr>          
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