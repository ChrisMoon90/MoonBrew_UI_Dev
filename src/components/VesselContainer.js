import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import ActorButtons from './ActorButtons';
import SensorRead from './sensor_read';

function VesselContainer(props) {

  // let vessel_name = props.vessel_name
  // let title = props.vessel_name.replace(/_/g,' ')
  // let cache
  // let new_read
  // let tar_temp
  // let v_dict

  console.log('vessel cont render')
  const [vessel_name, setVesselName] = useState('')
  const [title, setTitle] = useState('')
  const [cache, setCache] = useState('')
  // const [new_read, setNewRead] = useState('')
  const [v_dict, setvDict] = useState('')
  const [tar_temp, setTarTemp] = useState('')
  const [s_rows, set_s_rows] = useState([])
  // console.log(new_read)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
        setVesselName(props.vessel_name)
        setTitle(props.vessel_name.replace(/_/g,' '))
        setCache(props.cache)
        setvDict(props.cache['VESSELS'][props.vessel_name])
        setTarTemp(props.cache['VESSELS'][props.vessel_name]['Params']['tar_temp'])
        // let b = {}
        // for (let r in props.cache['SENSORS']) {
        //   b[r] = props.cache['SENSORS'][r]['cur_read']}_read
        //   console.log('b: ', b)
        // setNewRead(b)
        c_update()
        console.log('vessel cache render')
      }
      return () => { 
        isMounted = false
    }
  }, [props.cache]);

  // useEffect(() => {
  //   let isMounted = true
  //   if (isMounted) {
  //     setNewRead(props.new_read)
  //     // console.log('vessel reading render', props.new_read)
  //   }
  //   return () => { 
  //       isMounted = false
  //   }
  // }, [props.new_read]);

  // try {
  //   cache = props.cache
  //   new_read = props.new_read
  //   v_dict = cache['VESSELS'][vessel_name]
  //   tar_temp = v_dict['Params']['tar_temp']
  // } catch(err){}

  let index
  let s_name
  let s_read
  let sval
  let unit

  function c_update() {
    console.log('c_update render')

    for (let key in props.cache['VESSELS'][props.vessel_name]['Sensors']) {
      try{
        s_name = props.cache['VESSELS'][props.vessel_name]['Sensors'][key]['name']
        index = props.cache['VESSELS'][props.vessel_name]['Sensors'][key]['index']
        // s_read = new_read[index]
        // console.log('s_read: ', s_read)
        sval = props.cache['SENSORS'][index]['dev_name']
        if (sval.search("Temp") === 0) {unit = " \xB0F"}
          else if (sval.search("pH") === 0) {unit = ' pH'}
          else {unit = " SG"}
      } catch(err){
        console.log('VesselContainer Error: sensor missing key')
        s_name = 'ERR'
        s_read = 'ERR'
        unit = ''
      }
      let s_rows_new = []
      if (key === '0') {
        s_rows_new.push(
          <Row className="align-items-center">
            <Col className = "align-items-center">
              <Row><center>{s_name}</center></Row>
              <Row className= "align-items-top"  style={{height: 45, fontSize: 28}}><SensorRead index = {index}/>{unit}</Row>
            </Col>
            <Col className="align-items-center">
              <Row style={{fontSize: 12}}><center>Target Temp</center></Row>
              <Row style={{fontSize: 16}}><center>{tar_temp}{unit}</center></Row>
            </Col>
          </Row>
        )
      }
      else {
        s_rows_new.push(
        <Col>
          <Row><small>{s_name}</small></Row>
          <Row style={{fontSize: 20}}><center>{s_read}{unit}</center></Row>
        </Col>
        )         
      }
      set_s_rows(s_rows_new)
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
        <ActorButtons vessel = {vessel_name} cache = {cache} v_dict = {v_dict}/>
      </Card.Footer>
    </Card>
  )
}

export default VesselContainer;