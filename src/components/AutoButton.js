import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { socket } from '../App';
import FanStateButtons from './FanButtons';

function AutoButton(props) {
    let fanID = props.fanID
    let AutoState = props.auto_state
    let FanState = props.fan_states

    function toggleAutoState() {
        socket.emit('toggle_auto_state');
    } 

    let Button_read;
    if (AutoState === false) {
        Button_read = <Button size="sm" variant="secondary" onClick={() => toggleAutoState()}>AUTO</Button>;
      } 
    else {
        Button_read = <Button size="sm" variant="success" onClick={() => toggleAutoState()}>AUTO</Button>;
      }

    return(
        <div>
            <ButtonGroup aria-label="Basic example">
                <div>{Button_read}</div>
                <div><FanStateButtons fanID = {fanID} fan_states = {FanState}/></div>
            </ButtonGroup>
        </div>
    )
}

export default AutoButton;