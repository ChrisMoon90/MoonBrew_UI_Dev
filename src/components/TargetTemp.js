import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import { socket } from '../App';


function TargetTemp() {
  const [value, setValue] = useState("");

  useEffect(() => {
    let isMounted = true;
    socket.emit("Fetch_TarTemp")
    
    socket.on("TarTemp", tar_temp => {
      if (isMounted) {
        setValue(tar_temp)
        console.log("Target Temp Received: ", tar_temp)
      }
    });
    return () => { 
      isMounted = false;
    };
  }, []);

  const marks = [
    {
      value: 150,
      label: '150°C',
    },
    {
      value: 350,
      label: '350°C',
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    socket.emit("TarTemp_Update", newValue)
  };
  function valuetext(value) {
    return `${value}°C`;
  }
  function valueLabelFormat(value) {
    return value;
  }

  return(
    <div>
      <Container fluid>
        <Row>
          <Col ><strong>Target Temp: {value}</strong><h4><br></br></h4></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="auto">        
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Temperature"
                value={typeof value === 'number' ? value : 0}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={5}
                marks={marks}
                min={150}
                max={350}
              />
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TargetTemp;