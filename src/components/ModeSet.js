// import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from '../App';


function ModeSet(props) {
  const mode = 'Brew' //props.temp_indexes;

  function handleUpdate(e) {
      const mode = e
      console.log("Mode Updated: ", mode);
      socket.emit("mode_change", mode)
    }

return(
      <div>
        <h2>Mode Setting</h2>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="med">
            {mode}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => handleUpdate('Brew')}>Brew</Dropdown.Item>
            <Dropdown.Item onClick={(e) => handleUpdate('Ferment')}>Ferment</Dropdown.Item>
            <Dropdown.Item onClick={(e) => handleUpdate('Smoke')}>Smoke</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4><br></br></h4>
      </div>
    );
}

export default ModeSet;