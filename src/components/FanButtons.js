import React from 'react';
import Button from 'react-bootstrap/Button';

import { socket } from '../App';

function FanStateButtons(props) {
    let fanID = props.fanID
    let FanState = props.fan_states

    function toggleFanState() {
        socket.emit('toggle_fan_state', fanID);
    } 

    let cur_FanState = FanState[fanID]
    let Button_read;
    if (cur_FanState === "OFF") {
        Button_read = <Button variant="secondary" onClick={() => toggleFanState()}>OFF</Button>;
      } 
    else {
        Button_read = <Button variant="success" onClick={() => toggleFanState()}>ON</Button>;
      }


    return(
        <div>{Button_read}</div>
    )
}

export default FanStateButtons;