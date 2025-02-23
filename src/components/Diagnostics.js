import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { ButtonGroup, Row, Col } from 'react-bootstrap'

import SystemButton from './SystemButton'
import SensorRead from './sensor_read'

function Configuration(props) {

    let cache
    let sensors
    let actors
    try{
        cache = props.cache
        sensors = props.cache['SENSORS']
        actors = props.cache['ACTORS']
    } catch(err) {}

    let s_rows = []
    let s_num
    let s_name
    let com_type
    for (let key in sensors) {
         try{
            s_num = Number(key)
            s_name = sensors[key]['dev_name']
            com_type = sensors[key]['com_type']
        } catch(err) {}
        s_rows.push(
            <tr key = {key}>
            <td>{s_num}</td>
            <td>{s_name}</td>
            <td>{com_type}</td>
            <td><SensorRead cache = {props.cache} index = {key}/></td>
            </tr>
        )
    }

    let a_rows = []
    let a_num
    let a_name
    let state
    let pin
    for (let key in actors) {
      try{
        a_num = Number(key)
        a_name = actors[key]['dev_name']
        state = String(actors[key]['state'])
        pin = actors[key]['pin']
    } catch(err) {}
      a_rows.push(
        <tr key = {key}>
          <td>{a_num}</td>
          <td>{a_name}</td>
          <td>{state}</td>
          <td>{pin}</td>
        </tr>
      )
    }

    return(
        <>
            <style type="text/css">
                    {`
                tr {
                    line-height: 20px;
                    font-size: 14px;
                }
                .btn-sm9 {
                    padding: 0.15rem .25rem;
                    font-size: 0.9rem;
                }
                #ctext {
                    text-align: left;
                    font-size: 0.75rem;
                }
                `}
            </style>

            <br></br>
            <Container fluid style={{padding: 0}}>
                <Row style={{fontSize: 24}}><center>Log Files</center></Row>
                <Table bordered hover size='sm5' variant='light' responsive> 
                    <thead>
                        <tr style={{lineHeight: .7}}>
                            <th>File Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>         
                    <tbody>   
                    <tr>
                        <td>sensors.csv</td>
                        <td>
                            <ButtonGroup>
                                <SystemButton type = 'download' action = 'download_sensor_data'/>
                                <SystemButton type = 'delete' action = 'delete_sensor_data'/>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>system.txt</td>
                        <td>
                            <ButtonGroup>
                                <SystemButton type = 'download' action = 'download_system_data'/>
                                <SystemButton type = 'delete' action = 'delete_system_data'/>
                            </ButtonGroup>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Container>

            <br></br>
            <Row style={{fontSize: 24}}><center>Detected Sensors</center></Row>
            <Table bordered hover size='sm5' variant='light' responsive>          
                <thead>
                    <tr style={{lineHeight: .7}}>
                    <th>#</th>
                    <th>dev_name</th>
                    <th>com_type</th>
                    <th>cur_read</th>
                    </tr>
                </thead>
                <tbody>      
                    {s_rows}
                </tbody>
            </Table>

            <br></br>
            <Row style={{fontSize: 24}}><center>Detected Actors</center></Row>
            <Table bordered hover size='sm5' variant='light' responsive>          
                <thead>
                    <tr style={{lineHeight: .7}}>
                    <th>#</th>
                    <th>actor_name</th>
                    <th>state</th>
                    <th>pin</th>
                    </tr>
                </thead>
                <tbody>      
                    {a_rows}
                </tbody>
            </Table>

            <br></br>
            <Row style={{fontSize: 24}}><center>System Controls</center></Row>
            <SystemButton type = 'reboot' action = 'reboot' />
            <br></br>
            <SystemButton type = 'init' action = 'init_sensors' />
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <Row style={{fontSize: 24}}><center>Server Cache</center></Row>
            <Row>
                <Col xs={5}></Col>
                <Col><pre id='ctext'>{JSON.stringify(cache, null, "\t")}</pre></Col>
            </Row>
        </>
    )
}

export default Configuration