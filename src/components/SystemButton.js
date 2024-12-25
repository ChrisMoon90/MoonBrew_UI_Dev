import React from 'react'
import Button from 'react-bootstrap/Button'
import { socket } from '../App';
import axios from 'axios'
import { BsCloudDownload, BsPower, BsXLg , BsSearch } from "react-icons/bs"

import { ENDPOINT } from '../App';

function SystemButton(props) {
    let type = props.type
    let action = props.action
    let icon
    let color

    if (type === 'download') {
        icon = ['Download ', <BsCloudDownload key='0'/>]
        color = 'secondary'
    }
    else if (type === 'delete') {
        icon = ['Delete ', <BsXLg key='1'/>]
        color = 'danger'
    }
    else if (type === 'init') {
        icon = ['Re-Detect Sensors ', <BsSearch key='2'/>]
        color = 'secondary'
    }
    else if (type === 'reboot') {
        icon = ['Reboot  ', <BsPower key='3'/>]
        color = 'danger'
    }

    function send_to_server(action) {

        if (action === 'reboot') {
            if (window.confirm('Are you sure you want to reboot the system?')) {
                socket.emit('reboot')
            }
        } 

        else if (action === 'download_sensor_data') {
                console.log('Download requested: ', action)
                axios.get(ENDPOINT + '/api/sensors')
                    .then ((r) => {
                        download('sensors', r.data)
                    })
                    .catch((e) => console.log(e))
        } 

        else if (action === 'delete_sensor_data') {
            if (window.confirm('Are you sure you want to delete sensor data?')) {
            socket.emit('delete', 'sensors.csv')
            }
        }   

        else if (action === 'init_sensors') {
            console.log('Re-Detect Sensors Initiated')
            socket.emit('init_sensors')
        }

        else if (action === 'download_system_data') {
            console.log('Download requested: ', action)
            axios.get(ENDPOINT + '/api/system')
                .then ((r) => {
                    download('system', r.data)
                })
                .catch((e) => console.log(e))
        }
        else if (action === 'delete_system_data') {
            if (window.confirm('Are you sure you want to delete system data?')) {
            socket.emit('delete', 'system.txt')
            }
        }
    }

    function download(target, data) {
        const blob = new Blob([data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob) 
        const a = document.createElement('a') 
        a.setAttribute('href', url) 
        let fn
        if (target === 'system') {fn = 'system.txt'}
        else {fn = 'sensors.csv'}
        a.setAttribute('download', fn); 
        a.click() 
    }

    return(
        <>
            <Button size="sm9" variant={color} onClick={(f) => send_to_server(action)}>{icon}</Button>
        </>
    )
}

export default SystemButton; 