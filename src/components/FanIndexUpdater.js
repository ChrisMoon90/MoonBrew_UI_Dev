import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { socket } from '../App';

function SetFanIndex (props) { 
    const fan_indexes = props.fan_indexes;
    const disp_fan_index = fan_indexes[props.fanID];
  
    function handleUpdate(e, f) {
        const fan_indexes = props.fan_indexes
        fan_indexes[e] = f;
        // console.log("Fan_Indexes Updated: ", fan_indexes);
        socket.emit("fan_index_change", fan_indexes)
      }
    
      return(
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              Fan {disp_fan_index +1}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e, f) => handleUpdate(props.fanID, 0)}>1</Dropdown.Item>
              <Dropdown.Item onClick={(e, f) => handleUpdate(props.fanID, 1)}>2</Dropdown.Item>
              <Dropdown.Item onClick={(e, f) => handleUpdate(props.fanID, 2)}>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    };
  
    export default SetFanIndex;