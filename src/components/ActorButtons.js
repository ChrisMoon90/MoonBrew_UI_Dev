import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { socket } from '../App';

function ActorButtons(props) {
    let vessel = props.vessel
    let cache
    let v_dict
    let s_dict
    let auto_state
    try {
        cache = props.cache
        v_dict = props.v_dict
        s_dict = props.cache['SYSTEM']
        auto_state = s_dict['AutoStates'][vessel]
    } catch(err){}

    let p_buttons = []
    let btn
    for (let key in v_dict['Actors']) {
        let a_name = v_dict['Actors'][key]['name']
        let index = v_dict['Actors'][key]['index']
        let a_state = cache['ACTORS'][index]['state']
        if (a_state === false) {
            btn = <Button key = {key} size="sm" variant="secondary" onClick={() => toggleState(index, a_state)}>{a_name}</Button>
        } 
        else {
            btn = <Button key = {key} size="sm" variant="success" onClick={() => toggleState(index, a_state)}>{a_name}</Button>
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

    function toggleState(index, a_state) {
        let a_dict = cache['ACTORS'][index]
        a_dict['state'] = !a_state
        console.log('a_dict updated: ', a_dict)
        socket.emit('actor_update', index, a_dict)
    } 
    function toggleAutoState() {
        s_dict['AutoStates'][vessel] = !auto_state
        console.log('auto_state updated: ', s_dict)
        socket.emit('system_update', s_dict)
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