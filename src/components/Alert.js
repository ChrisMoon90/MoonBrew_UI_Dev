import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

import { socket } from '../App';

function NewAlert() {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        socket.on("log_deleted", msg => {
            console.log(msg);
            setShow(true);
        });
    }, []);
    

    if (show) {
      return (
        <Alert variant="success" closeLabel="" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Temp Log Sucessfully Deleted</Alert.Heading>
        </Alert>
      );
    }
    return null
  }

  export default NewAlert;