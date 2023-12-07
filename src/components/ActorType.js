// import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { socket } from '../App';

function ActorType(props) {
    let vessel = props.vessel
    let hw_id
    let v_dict
    let active_type
    try {
        hw_id = props.hw_id
        v_dict = props.v_dict
        active_type = v_dict['Actors'][hw_id]['type']
    } catch(err){}

    function handleUpdate(a_type) {
        console.log('Actor Type Update on ' + vessel + ': ' + a_type)
        v_dict['Actors'][hw_id]['type'] = a_type
        socket.emit("vessel_update", vessel, v_dict)
      }
    
    return(
        <div>
        <style type="text/css">
                {`
            .btn-sm5 {
                padding: .05rem .5rem;
                font-size: .8rem;
            }
            `}
        </style>

        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm5">
            {active_type}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={(f) => handleUpdate('Pump')}>Pump</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate('Heater')}>Heater</Dropdown.Item>
            <Dropdown.Item onClick={(f) => handleUpdate('Chiller')}>Chiller</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
    };

export default ActorType;