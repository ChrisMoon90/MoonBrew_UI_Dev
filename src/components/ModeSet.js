import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from '../App';


function ModeSet(props) {
  var cache = props.cache
  var mode = ''
  try {mode = cache['SYSTEM']['Mode']}
  catch(err){}
  
  function handleUpdate(m) {
      var mode = m
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