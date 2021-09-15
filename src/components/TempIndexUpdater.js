import Dropdown from 'react-bootstrap/Dropdown';
//import { BsPencilSquare } from 'react-icons/bs';

import { socket } from '../App';

function SetTempIndex (props) { 
  const temp_indexes = props.temp_indexes;
  const disp_temp_index = temp_indexes[props.sensor];

  function handleUpdate(e, f) {
      const temp_indexes = props.temp_indexes
      console.log(temp_indexes);
      temp_indexes[e] = f;
      console.log("Temp_Indexes Updated: ", temp_indexes);
      socket.emit("temp_index_change", temp_indexes)
    }
  
    return(
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
            Sensor {disp_temp_index +1}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 0)}>1</Dropdown.Item>
            <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 1)}>2</Dropdown.Item>
            <Dropdown.Item onClick={(e, f) => handleUpdate(props.sensor, 2)}>3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  export default SetTempIndex;