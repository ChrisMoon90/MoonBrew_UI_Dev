import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import { socket } from '../App';


function TempTol() {
    const [tempTol, setTempTol] = useState("");

    useEffect(() => {
        let isMounted = true;
        socket.emit("Fetch_TempTol")
        
        socket.on("TempTol", temp_tol => {
          if (isMounted) {
            setTempTol(temp_tol)
            console.log("Temp Tol Received: ", temp_tol)
          }
        });
        return () => { 
          isMounted = false;
        };
      }, []);

    const handleInputChange = (event) => {
        let new_tol = Number(event.target.value)
        setTempTol(new_tol === '' ? '' : Number(event.target.value));
        socket.emit("ToggleTempTol", new_tol)
        console.log("Temp Tol Updated: ", new_tol)
    };

    const handleBlur = () => {
        if (tempTol < 0) {
          setTempTol(0);
        } else if (tempTol > 50) {
          setTempTol(50);
        }
      };

    return(
        <div>
            <Container>
                <Row>
                    <Col className="justify-content-sm-right"><strong>Set Tollerance: </strong><h6><br></br></h6></Col>
                </Row>
                <Row>
                    <Col className="justify-content-sm-left">
                        <Input
                            value={tempTol}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 50,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                        }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TempTol;