import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist//ReactToastify.css'

import { socket } from '../App';

function NewAlert() {
    
    useEffect(() => {
      let isMounted = true;
      
      socket.on("logState", logState => {
        if (isMounted) {
          if (logState) {
          toast.success('Logging Active');
          } else {
            toast.warn('Logging Inactive');
          }
        }
      });
      socket.on("log_deleted", msg => {
        if (isMounted) {
          toast.success('Log Deleted');
        }
      });
      return () => { 
        isMounted = false;
      };
    }, []);
    
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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