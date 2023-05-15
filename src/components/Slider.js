import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

import { socket } from '../App';

function Slider(props) {
  let s_dict = ''
  let log_rate = ''

  try {
    s_dict = props.cache['SYSTEM']
    log_rate = s_dict['Static']['log_rate']
  }
  catch(err) {}

  useEffect(() => {
    setCurVal(log_rate)
  }, [props.cache])
  
  const [ cur_val, setCurVal] = useState('') 

  let send_val = useCallback(
    debounce((value, s_dict) => {
      console.log('log_rate update: ', s_dict)
      s_dict['Static']['log_rate'] = value
      socket.emit("system_update", s_dict)
    }, 750), []
  )

  return (
    <Container fluid>
    <Form.Group as={Row}>
      <Col xs="3">
        <Form.Label>Log Rate</Form.Label>
      </Col> 
      <Col xs="6">
        <Form.Range
          value={cur_val}
          onChange = {e => {setCurVal(e.target.value); send_val(e.target.value, s_dict)}}
          min={1}
          max={60}
          step={1}
        />
      </Col>
      <Col xs="3">
        <div>{cur_val} mins</div>
      </Col>
    </Form.Group>
    </Container>
  ) 
}

export default Slider