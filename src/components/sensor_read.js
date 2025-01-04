import React, { useState, useEffect } from 'react';

import { socket } from '../App'

function SensorRead(props) {

    console.log('SensorRead Render')

    const [new_read, setNewRead] = useState('')
  
    useEffect(() => {
        let isMounted = true
        if (isMounted) {

            let index
            try {
                index = props.index
            } catch {}

            let b = {}
            for (let r in props.cache['SENSORS']) {
                b[r] = props.cache['SENSORS'][r]['cur_read']
            }
            // console.log('Cache Reading Update: ', b)
            let unit
            let sval = props.cache['SENSORS'][index]['dev_name']
            if (sval.search("Temp") === 0) {unit = " \xB0F"}
            else if (sval.search("pH") === 0) {unit = ' pH'}
            else {unit = " SG"} 
            setNewRead(b[index] + unit)

            socket.on("reading_update", cache => {
                let b = {}
                for (let r in cache['SENSORS']) {
                    b[r] = cache['SENSORS'][r]['cur_read']
                }
                console.log('Reading Update: ', b)
                setNewRead(b[index] + unit)
            })  

        }
        return () => { 
            isMounted = false
            socket.off("reading_update")
            console.log('unmounted sensor_read')
        }
    }, [props.cache, props.index])

    return(
        <center>{new_read}</center>
    )
}

export default SensorRead;