import Dropdown from 'react-bootstrap/Dropdown';
//import { BsPencilSquare } from 'react-icons/bs';

import { socket } from '../App';

function IndexUpdater (props) { 
  let vessel = props.vessel
  let hw_id = props.hw_id
  let hw_type = props.hw_type
  let v_dict
  let index
  let dev_list
  try {
    v_dict = props.v_dict
    index = v_dict[hw_type + "s"][hw_id]['index']
    dev_list = props.dev_list
  } catch(err){console.log('Failed to Load Index Updater Props')}

  function handleUpdate(f) {
      v_dict[hw_type + "s"][hw_id]['index'] = f
      console.log("v_dict updated on ", vessel, ": ", v_dict);
      socket.emit("vessel_update", vessel, v_dict)
    }
  
    return(
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
            {hw_type} {index + 1}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(f) => handleUpdate('None')}>None</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate(0)}>{dev_list[0]}</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate(1)}>{dev_list[1]}</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate(2)}>{dev_list[2]}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  export default IndexUpdater;