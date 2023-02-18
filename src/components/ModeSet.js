import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Row } from 'react-bootstrap';

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
    <>
      <style type="text/css">
            {`
        .set-title {
          color: white;    
        }
        .set-cont {
          background-color: #707070;
        }
        `}
      </style>
      <br></br>
      <Container className="square rounded-3 border border-dark border-3 set-cont">
        <Row className="set-title"><center><h2 class="display-6">System Settings</h2></center></Row>
        <Row>
          <Table striped bordered hover size='sm' variant='dark'>          
            <thead>
                <tr>
                  <th>Item</th>
                  <th>Setting</th>
                </tr>
            </thead>
            <tbody>      
              <tr>
                <td>Mode</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
                      {mode}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(m) => handleUpdate('Brew')}>Brew</Dropdown.Item>
                      <Dropdown.Item onClick={(m) => handleUpdate('Ferment')}>Ferment</Dropdown.Item>
                      <Dropdown.Item onClick={(m) => handleUpdate('Smoke')}>Smoke</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>               
            </tbody>
          </Table>
        </Row>
      </Container>
      <br></br>
    </>
  );
}

export default ModeSet;