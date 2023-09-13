import Dropdown from 'react-bootstrap/Dropdown';
//import { BsPencilSquare } from 'react-icons/bs';

import { socket } from '../App';

function IndexUpdater (props) { 
  let vessel = props.vessel
  let hw_id = props.hw_id
  let hw_type = props.hw_type
  let v_dict
  let devs
  let index
  let active_dev
  try {
    v_dict = props.v_dict
    devs = props.devs
    index = v_dict[hw_type + "s"][hw_id]['index']
    active_dev = devs[index]['dev_name']
    } catch(err){}

  function handleUpdate(f) {
    v_dict[hw_type + "s"][+hw_id]['index'] = f
    console.log("v_dict updated on ", vessel, ": ", v_dict);
    socket.emit("vessel_update", vessel, v_dict)
  }

  let dropdown = []
  for (let key in devs) {
    dropdown.push(<Dropdown.Item key = {key} onClick={(f) => handleUpdate(key)}>{devs[key]['dev_name']}</Dropdown.Item>)
  }

    return(
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
            {active_dev}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {dropdown}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  export default IndexUpdater;