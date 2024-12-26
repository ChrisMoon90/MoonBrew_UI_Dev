import React, { useState, useEffect } from 'react';

import { socket } from '../App'
// import { Container } from 'react-bootstrap';


function SensorRead(props) {

    const [new_read, setNewRead] = useState('')
  
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            socket.on("reading_update", cache => {
                let b = {}
                for (let r in cache['SENSORS']) {
                    b[r] = cache['SENSORS'][r]['cur_read']
                }
                console.log('Reading Update: ', b)
                setNewRead(b[props.index])
            })   
            
        }
    return () => { 
        isMounted = false
    }
  }, [props.new_read])

  return(
    <center>{new_read}</center>
  )
}

export default SensorRead;