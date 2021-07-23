import Dropdown from 'react-bootstrap/Dropdown';
//import { BsPencilSquare } from 'react-icons/bs';

import { socket } from '../App';

function SetIndex (props) { 
  const indexes = props.indexes;
  const disp_index = indexes[props.sensor];

  function handleUpdate(e, f) {
      const indexes = props.indexes
      console.log(indexes);
      indexes[e] = f;
      console.log("Indexes Updated: ", indexes);
      socket.emit("index_change", indexes)
    }
  
    return(
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
            Sensor {disp_index +1}
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

  export default SetIndex;