import React, { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { socket } from '../App';

function LogButtons() {
    socket.emit("fetch_log_state");
    const [logState, setLogState] = useState("");

    useEffect(() => {
        let isMounted = true
        socket.on("logState", logState => {
            if (isMounted) {
                setLogState(logState);
                console.log("LogState Updated: ", logState);
            }
        });
        return () => { 
            console.log('Unmounted LogButtons');
            isMounted = false;
        }; 
    }, []);
    
    function toggleLogState() {
        socket.emit('toggle_logState', logState);
    }

    let cur_logState = logState
    let Button_read;
    if (cur_logState) {
        Button_read = <Button variant="warning" onClick={() => toggleLogState()}>Stop Logging</Button>;
      } else {
        Button_read = <Button variant="secondary" onClick={() => toggleLogState()}>Start Logging</Button>;
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