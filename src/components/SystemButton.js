import React from 'react'
import Button from 'react-bootstrap/Button'
import { socket } from '../App';
import axios from 'axios'
import { BsCloudDownload, BsPower, BsXLg } from "react-icons/bs"

import { ENDPOINT } from '../App';

function SystemButton(props) {
    let target = props.target
    let action = props.action
    let icon
    let color

    if (action === 'download') {
        icon = ['Download ', <BsCloudDownload key='0'/>]
        color = 'secondary'
    }
    else if (action === 'delete') {
        icon = ['Delete ', <BsXLg key='1'/>]
        color = 'danger'
    }
    else {
        icon = ['Reboot  ', <BsPower key='2'/>]
        color = 'danger'
    }

    function send_to_server(target) {
        if (target === 'reboot') {
            if (window.confirm('Are you sure you want to reboot the system?')) {
                console.log('Reboot requested')
                socket.emit('reboot')
            }
        } 
        else if (target === 'sensors') {
            if (action === 'download') {
                console.log('Download requested: ', target)
                axios.get(ENDPOINT + '/api/sensors')
                    .then ((r) => {
                        download(target, r.data)
                    })
                    .catch((e) => console.log(e))
            } 
            else {
                socket.emit('delete', 'sensors.csv')
            }
        }       
        else if (target === 'system') {
            if (action === 'download') {
                console.log('Download requested: ', target)
                axios.get(ENDPOINT + '/api/system')
                    .then ((r) => {
                        download(target, r.data)
                    })
                    .catch((e) => console.log(e))
            }
            else {
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
            <Button size="sm9" variant={color} onClick={(f) => send_to_server(target)}>{icon}</Button>
        </>
    )
}

export default SystemButton; 