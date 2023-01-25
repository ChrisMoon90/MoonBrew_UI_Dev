import React from 'react';
import Button from 'react-bootstrap/Button';

import { socket } from '../App';

function PowerButton(props) {
  let vessel = props.vessel
  let hwID = props.hwID
  let hw_index
  let power_state
  try {
    hw_index = props.cache['VESSELS'][vessel]['indexes'][hwID]
    power_state = props.cache['HARDWARE'][hw_index]['state']
    console.log('power_state: ', power_state)
  } catch(err){}

    function toggleState(power_state) {
        socket.emit('toggle_power_state', hwID, power_state);
    } 

    // let cur_State = power_state
    let Button_read;
    if (power_state === "OFF") {
        Button_read = <Button size="sm" variant="secondary" onClick={() => toggleState("ON")}>PWR</Button>;
      } 
    else {
        Button_read = <Button size="sm" variant="success" onClick={() => toggleState("OFF")}>PWR</Button>;
      }

    return(
        <div>{Button_read}</div>
    )
}

export default PowerButton;