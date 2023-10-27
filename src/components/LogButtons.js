import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { socket } from '../App';

function LogButtons(props) {
    let s_dict = ''
    let log_state = ''
  
    try {
      s_dict = props.cache['SYSTEM']
      log_state = s_dict['Dynamic']['log_state']
    }
    catch(err) {}

    function toggleLogState() {
        log_state = !log_state
        console.log('log_state update: ', log_state)
        s_dict['Dynamic']['log_state'] = log_state
        if (log_state) {
            s_dict['Dynamic']['timer_start'] = Date.now()
            }
        else {s_dict['Dynamic']['timer_start'] = 0}
        socket.emit('set_log_state', s_dict)
    }

    let Button_read
    if (log_state) {
        Button_read = <Button variant="warning" onClick={() => { if (window.confirm('Are you sure you want to stop logging?')) toggleLogState() } }>Stop Log</Button>;
      } else {
        Button_read = <Button variant="secondary" onClick={() => toggleLogState() }>Start Log</Button>;
      }

    function deleteLog() {
        socket.emit('delete_log');
    }

    return(
        <div>
            
            <ButtonGroup aria-label="Basic example">
                {Button_read}
                <Button variant="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete the log?')) deleteLog() } }>Delete Log</Button>
            </ButtonGroup>
        </div>
    )
}

export default LogButtons;