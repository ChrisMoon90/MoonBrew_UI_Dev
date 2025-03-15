import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useState, useEffect } from 'react'

import { socket } from '../App';

function ActorButtons(props) {

    const [cache, setCache] = useState('')
    
    let vessel = props.vessel
    let v_dict
    let s_dict
    let auto_state
    let p_buttons = []

    try {
        v_dict = cache['VESSELS'][vessel]
        s_dict = cache['SYSTEM']
        auto_state = s_dict['AutoStates'][vessel]
        for (let key in v_dict['Actors']) {
            let btn
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
    } catch(err){}

    useEffect(() => {

        setCache(props.cache)

        socket.on("actor_update", cache_in => {
            setCache(cache_in)
            console.log('Actor Update In: ', cache_in['ACTORS'])
        })

        socket.on("auto_update", cache_in => {
            setCache(cache_in)
            console.log('Auto Update In: ', cache_in['SYSTEM']['AutoStates'])
        })

        return () => { 
            socket.off("actor_update")
            socket.off("auto_update")
            console.log('Unmounted Actor Buttons')
        }
    }, [props.cache]);



    let auto_btn
    if (auto_state === false) {
        auto_btn = <Button size="sm" variant="secondary" onClick={() => toggleAutoState()}>AUTO</Button>
    } 
    else {
        auto_btn = <Button size="sm" variant="success" onClick={() => toggleAutoState()}>AUTO</Button>
    }

    function toggleState(index, a_state) {
        let actor = cache['ACTORS'][index]
        actor['state'] = !a_state
        let a_dict = cache['ACTORS']
        console.log('Actor Update Out: ', a_dict)
        socket.emit('actor_update', a_dict)
    } 
    function toggleAutoState() {
        s_dict['AutoStates'][vessel] = !auto_state
        console.log('Auto Update Out: ', s_dict)
        socket.emit('auto_update', s_dict)
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