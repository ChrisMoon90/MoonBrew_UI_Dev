import Dropdown from 'react-bootstrap/Dropdown';
//import { BsPencilSquare } from 'react-icons/bs';

import { socket } from '../App';

function SensorUpdater (props) { 
  let vessel = props.vessel
  let sensor = props.sensor
  let v_dict
  let index
  try {
    v_dict = props.v_dict
    index = v_dict['Sensors'][sensor]['index']
  } catch(err){console.log('Failed to Load SensorUpdater Props')}

  function handleUpdate(f) {
      v_dict['Sensors'][sensor]['index'] = f
      console.log("v_dict updated on ", vessel, ": ", v_dict);
      socket.emit("vessel_update", vessel, v_dict)
    }
  
    return(
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
            Sensor {index + 1}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(f) => handleUpdate(0)}>1</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate(1)}>2</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate(2)}>3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  export default SensorUpdater;