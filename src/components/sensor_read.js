import React, { useState, useEffect } from 'react';

import { socket } from '../App'

function SensorRead(props) {

    console.log('SensorRead Render')

    const [new_read, setNewRead] = useState('')
  
    useEffect(() => {

        function get_reading(cache){
            let unit
            try {
                let sval = cache['SENSORS'][props.index]['dev_name']
                if (sval.search("Temp") === 0) {unit = " \xB0F"}
                else if (sval.search("pH") === 0) {unit = ' pH'}
                else {unit = " SG"} 
        
                let b = {}
                for (let r in cache['SENSORS']) {
                    b[r] = cache['SENSORS'][r]['cur_read']
                }
                // console.log('Reading Update: ', b)
                setNewRead(b[props.index] + unit)
            } catch {}

        }

        get_reading(props.cache)

        socket.on("reading_update", cache => {
            get_reading(cache)
        })  

        return () => { 
            socket.off("reading_update")
            console.log('unmounted sensor_read')
        }
    }, [props.cache, props.index])

    return(
        <center>{new_read}</center>
    )
}

export default SensorRead;