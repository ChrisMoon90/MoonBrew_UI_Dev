import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../App';

function ParamUpdater(props) {
  let param_type = props.param_type
  let d_name
  if (param_type === 'tar_temp') {d_name = 'Target Temp'} else {d_name = "Temp Tollerance"}
  let vessel = props.vessel
  let v_dict
  try {
    v_dict = props.v_dict
  } catch(err){console.log('Failed to Load SensorUpdater Props')}

  const [show, setShow] = useState(false);
  const [param, setParam] = useState("")
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpdate = e => {
    e.preventDefault()
    setShow(false)
    v_dict['Params'][param_type] = param
    console.log("v_dict updated on ", vessel, ": ", v_dict);
    socket.emit("vessel_update", vessel, v_dict)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Set {d_name} Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{d_name}</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setParam(e.target.value)}  
                placeholder="Enter Value"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ParamUpdater