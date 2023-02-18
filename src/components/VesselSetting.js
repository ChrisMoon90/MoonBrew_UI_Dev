import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap';

import SensorUpdater from './SensorUpdater';
import NameUpdater from './NameUpdater';


function VesselSetting(props) {
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
  let v_dict
  try {
    cache = props.cache
    tar_temp = props.cache['VESSELS'][vessel_name]['Params']['tar_temp']
    s0_name = cache['VESSELS'][vessel_name]['Sensors'][1]['name']
    s0 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][1]['index']]['cur_temp']
    s1_name = cache['VESSELS'][vessel_name]['Sensors'][2]['name']
    s1 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][2]['index']]['cur_temp']
    s2_name = cache['VESSELS'][vessel_name]['Sensors'][3]['name']
    s2 = cache['SENSORS'][cache['VESSELS'][vessel_name]['Sensors'][3]['index']]['cur_temp']
    v_dict = props.cache['VESSELS'][vessel_name]
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
        <Row className="set-title"><center><h2 class="display-6">{title}</h2></center></Row>
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
                <td><SensorUpdater vessel = {vessel_name} sensor = '1' v_dict = {v_dict}/></td>
                <td>{s0 + " \xB0F"}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>{s1_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id='2' v_dict = {v_dict}/></td>
                <td><SensorUpdater vessel = {vessel_name} sensor = '2' v_dict = {v_dict}/></td> 
                <td>{s1 + " \xB0F"}</td>
                </tr>          
                <tr>
                <td>3</td>
                <td>{s2_name} <NameUpdater hw_type = 'Sensor' vessel = {vessel_name} hw_id='3' v_dict = {v_dict}/></td>
                <td><SensorUpdater vessel = {vessel_name} sensor = '3' v_dict = {v_dict}/></td>
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
                <td>{s0_name}</td>
                <td><SensorUpdater vessel = {vessel_name} sensor = '1' v_dict = {v_dict}/></td>
                <td>{s0 + " \xB0F"}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>{s1_name}</td>
                <td><SensorUpdater vessel = {vessel_name} sensor = '2' v_dict = {v_dict}/></td> 
                <td>{s1 + " \xB0F"}</td>
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