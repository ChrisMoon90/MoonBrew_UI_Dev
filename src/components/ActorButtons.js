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
            btn = <Button key = {key} size="sm" variant="secondary" onClick={() => toggleState(key, a_state)}>{a_name}</Button>
        } 
        else {
            btn = <Button key = {key} size="sm" variant="success" onClick={() => toggleState(key, a_state)}>{a_name}</Button>
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

    function toggleState(key, a_state) {
        let a_dict = cache['ACTORS'][key]
        a_dict['state'] = !a_state
        console.log('a_dict updated: ', a_dict)
        socket.emit('hw_update', key, a_dict)
    } 
    function toggleAutoState() {
        v_dict['Params']['auto_state'] = !auto_state
        console.log('auto_state updated: ', v_dict)
        socket.emit('vessel_update', vessel, v_dict)
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