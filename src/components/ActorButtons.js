import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { socket } from '../App';

function ActorButtons(props) {
    let vessel = props.vessel
    let cache
    let v_dict
    let auto_state
    try {
        cache = props.cache
        v_dict = props.v_dict
        auto_state = v_dict['Params']['auto_state']
    } catch(err){}

    let p_buttons = []
    let btn
    for (let key in v_dict['Actors']) {
        let a_name = v_dict['Actors'][key]['name']
        let a_state = cache['ACTORS'][v_dict['Actors'][key]['index']]['state']
        if (a_state === false) {
            btn = <Button key = {key} size="sm" variant="secondary" onClick={() => toggleState()}>{a_name}</Button>
        } 
        else {
            btn = <Button key = {key} size="sm" variant="success" onClick={() => toggleState()}>{a_name}</Button>
        }
        p_buttons.push(btn)
    }

    let auto_btn
    if (auto_state === false) {
        auto_btn = <Button size="sm" variant="secondary" onClick={() => toggleAutoState()}>AUTO</Button>
    } 
    else {
        auto_btn = <Button size="sm" variant="success" onClick={() => toggleAutoState()}>AUTO</Button>
    }

    function toggleState(power_state) {
        socket.emit('toggle_power_state', power_state)
    } 
    function toggleAutoState() {
        socket.emit('toggle_auto_state')
    } 

    return(
        <div>
            <ButtonGroup>
                <div>{auto_btn}</div>
                <div>{p_buttons}</div>
            </ButtonGroup>
        </div>
    )
}

export default ActorButtons;