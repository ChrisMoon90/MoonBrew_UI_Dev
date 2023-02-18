import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../App';

function NameUpdater(props) {
  let hw_type = props.hw_type
  let vessel = props.vessel
  let hw_id = props.hw_id
  let v_dict
  try {
    v_dict = props.v_dict
  } catch(err){console.log('Failed to Load SensorUpdater Props')}

  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function handleUpdate() {
    setShow(false)
    v_dict[hw_type + "s"][hw_id]['name'] = name
    console.log("v_dict updated on ", vessel, ": ", v_dict);
    socket.emit("vessel_update", vessel, v_dict)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename {hw_type} {hw_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{hw_type} Name</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setName(e.target.value)}
                placeholder="Enter Name"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={(f) => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NameUpdater