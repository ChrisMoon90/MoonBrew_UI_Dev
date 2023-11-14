import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { socket } from '../App';
import Slider from './Slider'


function SystemSet(props) {
  var cache = props.cache
  let mode
  let s_dict
  try {
    mode = cache['SYSTEM']['Static']['Mode']
    s_dict = cache['SYSTEM']
  }
  catch(err){}
  
  function handleUpdate(m) {
      s_dict['Static']['Mode'] = m
      console.log("System Settings Updated: ", s_dict);
      socket.emit("system_update", s_dict)
    }

  return(
    <>
      <style type="text/css">
              {`
          .btn-sm5 {
              // padding: .05rem .5rem;
              font-size: .8rem;
          }
          .table-sm5 {
            line-height: 0.75rem;
            font-size: .9rem;
        }
          `}
      </style>

      <Card border="dark">
        <Card.Header style={{padding: 5, height: 55, fontSize: 25}}>System Settings</Card.Header>
        <Card.Body  style={{padding: 0}}>
        <br />
        <Container fluid style={{padding: 0}}>
          <Table striped bordered hover size='sm5' variant='light' responsive>          
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
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm5">
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
        <br />
        <Slider  cache = {cache} min = {0.5} max = {30} step = {0.5}/>
        </Container>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default SystemSet;