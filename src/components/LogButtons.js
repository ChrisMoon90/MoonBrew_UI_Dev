import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

import { socket } from '../App';

function LogButtons(props) {

    const [cache, setCache] = useState('')

    let s_dict = ''
    let log_state = ''
  
    try {
      s_dict = cache['SYSTEM']
      log_state = s_dict['Dynamic']['log_state']
    }
    catch(err) {}

    useEffect(() => {

        setCache(props.cache)

        socket.on("log_update", cache_in => {
            setCache(cache_in)
            console.log('Log Update In: ', cache_in['SYSTEM']['Dynamic']['log_state'])
        })

        return () => { 
            socket.off("log_update")
            console.log('Unmounted Log Buttons')
        }
    }, [props.cache]);

    function toggleLogState() {
        log_state = !log_state
        console.log('Log Update Out: ', log_state)
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
        if (window.confirm('Are you sure you want to delete sensor data?')) {
        socket.emit('delete', 'sensors.csv')
        }
    }

    return(
        <div>
            
            <ButtonGroup aria-label="Basic example">
                {Button_read}
                <Button variant="danger" onClick={() => { deleteLog() } }>Delete Log</Button>
            </ButtonGroup>
        </div>
    )
}

export default LogButtons;