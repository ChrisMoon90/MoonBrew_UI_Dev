import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from '../App';


function ModeSet(props) {
  // var cache = props.cache
  let mode
  let s_dict
  try {    
    mode = props.cache['SYSTEM']['Static']['Mode']
    s_dict = props.cache['SYSTEM']
  }
  catch(err){console.log('Failed to Load ModeSet')}
  
  function handleUpdate(m) {
      s_dict['Static']['Mode'] = m
      console.log("System Settings Updated: ", s_dict);
      socket.emit("system_update", s_dict)
    }

return(
      <div>
        <h2>Mode Setting</h2>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="med">
            {mode}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(m) => handleUpdate('Brew')}>Brew</Dropdown.Item>
            <Dropdown.Item onClick={(m) => handleUpdate('Ferment')}>Ferment</Dropdown.Item>
            <Dropdown.Item onClick={(m) => handleUpdate('Smoke')}>Smoke</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4><br></br></h4>
      </div>
    );
}

export default ModeSet;