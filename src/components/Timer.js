import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'

function Timer(props) {
    
    const [starttime, setStartTime] = useState(0)
    const [dur, setDur] = useState('-')

    

    useEffect(() => { 
        let cache = props.cache
        let tloop = setInterval(()=> {
            try {
                setStartTime(cache['SYSTEM']['Dynamic']['timer_start']) 
                if (starttime === 0) {
                    setDur('-')
                    }
                else {     
                    let now = Date.now() 
                    let ms; let sec; let min; let hour
                    ms = now - starttime
                    sec = ("00" + Math.floor((ms/1000) % 60)).slice(-2)
                    min = ("00" + Math.floor((ms/60000) % 60)).slice(-2)
                    hour = ("00" + Math.floor((ms/3600000) % 24)).slice(-2)
                    let duration = hour + ":" + min + ":" + sec
                    setDur(duration)
                    }
                } catch(err){}
                }, 500 )
        return () => clearInterval(tloop); 
    }, [starttime, props.cache]); 

    return(
        <div>
            <Container>
               Log Duration: {dur}               
            </Container> 
            <br></br>          
        </div>
    )
}

export default Timer;