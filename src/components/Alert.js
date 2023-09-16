import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist//ReactToastify.css'

import { socket } from '../App';

function NewAlert() {
    
    useEffect(() => {
      let isMounted = true;
      
      socket.on("alert_success", msg => {
        if (isMounted) {
          toast.success(msg);
        }
      });
      socket.on('alert_warn', msg => {
        if (isMounted) {
          toast.warn(msg);
        }
      });
      return () => { 
        isMounted = false;
      };
    }, []);
    
  return (
    <div>
      <ToastContainer
        className="foo" 
        style={{ width: "350px" }}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
    </div>
  );
}

  export default NewAlert;