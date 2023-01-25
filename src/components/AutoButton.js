import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { socket } from '../App';
import PowerButton from './PowerButton';

function AutoButton(props) {
    let vessel = props.vessel
    let hwID = props.hwID
    let cache
    let hw_index
    let power_state
    let auto_state
    try {
        cache = props.cache
        hw_index = props.cache['VESSELS'][vessel]['indexes'][hwID]
        power_state = props.cache['HARDWARE'][hw_index]['state']
        auto_state = props.cache['VESSELS'][vessel]['auto_state']
        console.log('auto_state: ', auto_state)
    } catch(err){}

    function toggleAutoState() {
        socket.emit('toggle_auto_state')
    } 

    let Button_read;
    if (auto_state === "OFF") {
        Button_read = <Button size="sm" variant="secondary" onClick={() => toggleAutoState()}>AUTO</Button>;
      } 
    else {
        Button_read = <Button size="sm" variant="success" onClick={() => toggleAutoState()}>AUTO</Button>;
      }

    return(
        <div>
            <ButtonGroup aria-label="Basic example">
                <div>{Button_read}</div>
                <div><PowerButton vessel = 'Smoker' hwID = {hwID} cache = {cache}/></div>
            </ButtonGroup>
        </div>
    )
}

export default AutoButton;