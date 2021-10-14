import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'

import { socket } from '../App';


function Timer() {
    const [CookDur, setCookDur] = useState("-")

    useEffect(() => {
        let isMounted = true;
        let t_state = false;
        socket.emit("fetch_timer");
        
        socket.on("start_time", start_time => {
            if (isMounted) {   
                console.log("Socket.On start time: ", start_time)  
                if (start_time === 0) {
                    t_state = false
                    setCookDur("-")
                    console.log("Timer Inactive")
                } else {
                    t_state = true
                    console.log("Timer Active")
                }
                toggle_timer(start_time, t_state)
            }
        });
        
        return () => { 
            isMounted = false;    
            console.log('Unmounted Timer');      
        }; 
        // eslint-disable-next-line
    }, []); 

    let timer_in;
    function toggle_timer (start_time, t_state) {   
        console.log("new_timerState: ", t_state)
        if (t_state) {
            console.log("Starting timer interval")
            timer_in = setInterval(()=> {
                let time = Date.now() 
                let ms; let sec; let min; let hour; let time_str
                ms = time - start_time
                sec = ("00" + Math.floor((ms/1000) % 60)).slice(-2)
                min = ("00" + Math.floor((ms/60000) % 60)).slice(-2)
                hour = ("00" + Math.floor((ms/3600000) % 24)).slice(-2)
                time_str = hour + ":" + min + ":" + sec
                setCookDur(cook => time_str);
                }, 1000 )
        } else {
            console.log("Stopping Timer Interval")
            clearInterval(timer_in);
        }
    }

    return(
        <div>
            <Container>
               Cook Duration: {CookDur}
            </Container>
        </div>
    )
}

export default Timer;