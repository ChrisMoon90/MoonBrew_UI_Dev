import './App.css'
import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'

import Header from './components/Header'
import VesselContainer from './components/VesselContainer'
import LogButtons from './components/LogButtons'
import NewAlert from './components/Alert'
import VesselConfig from './components/VesselConfig'
import HighChart from './components/Highchart'
import Timer from './components/Timer'
import SystemConfig from './components/SystemConfig'
import Diagnostics from './components/Diagnostics'

// const ENDPOINT = "http://192.168.0.30:5000"
const ENDPOINT = "http://24.7.0.49:80"
// const ENDPOINT = window.location.origin
console.log(ENDPOINT)
export const socket = io(ENDPOINT)
export {ENDPOINT}

function App() {

  const [cache, set_cache] = useState("")
  const [new_read, set_reading] = useState("")

  useEffect(() => {

    let isMounted = true
    
    socket.on("connect", msg => {
      if (isMounted) {
        console.log("Connected to socket.io server!")
        }
      }
    )

    socket.on("reading_update", cache => {
      if (isMounted) {
        let b = {}
        for (let r in cache['SENSORS']) {
          b[r] = cache['SENSORS'][r]['cur_read']
        }
        console.log('Reading Update: ', b)
        set_reading(b)
        }
      }
    )

    socket.on("cache", cache => {
      if (isMounted) {
        console.log('Cache Update', cache)
        set_cache(cache)
        }
      }
    )

    return () => { 
        console.log('Unmounted Home')
        isMounted = false
    }
  }, []);

  let mode
  let home
  let settings
  try {
    mode = cache['SYSTEM']['Static']['Mode']
    if (mode === 'Smoke') {
      home = <VesselContainer vessel_name = 'Smoker' cache = {cache} new_read = {new_read}/>;
      settings = <VesselConfig vessel_name = 'Smoker' cache = {cache} new_read = {new_read}/>}
    else if (mode === 'Brew') {
      home = [<VesselContainer key = '1' vessel_name = 'Boil_Kettle' cache = {cache} new_read = {new_read}/>,
              <VesselContainer key = '2' vessel_name = 'Mash_Tun' cache = {cache} new_read = {new_read}/>,
              <VesselContainer key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache} new_read = {new_read}/>];
      settings = [<VesselConfig key = '1' vessel_name = 'Boil_Kettle' cache = {cache} new_read = {new_read}/>,
                  <VesselConfig key = '2' vessel_name = 'Mash_Tun' cache = {cache} new_read = {new_read}/>,
                  <VesselConfig key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache} new_read = {new_read}/>]}          
    else if (mode === 'Ferment') {home = <VesselContainer vessel_name = 'Fermenter' cache = {cache} new_read = {new_read}/>;
                                  settings = <VesselConfig vessel_name = 'Fermenter' cache = {cache} new_read = {new_read}/>}
    else {home = 'Waiting for connection to server...';
          settings = 'Waiting for connection to server...'}
  } catch(err){console.log('Failed to Load Vessel')}

  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header cache = {cache}/>
          <div className="content">
            <Switch>
              <Route exact path="/">
              <Container fluid>
                <Row>
                  {home}
                </Row>
              </Container>
                <Container fluid>
                  <HighChart cache = {cache} size = '35%'/>
                </Container>
                <LogButtons cache = {cache}/>
                <Timer cache = {cache}/>
              </Route>
              <Route exact path="/chart">
                <Container fluid>
                  <HighChart cache = {cache} size = '50%'/>
                </Container>
                <LogButtons cache = {cache}/>
                <Timer cache = {cache}/>
              </Route>
              <Route path="/system">
                <SystemConfig cache = {cache}/>
                {settings}
              </Route>
              <Route path='/diagnostics'>
                <Diagnostics cache = {cache}/>  
              </Route>
            </Switch>
            <NewAlert />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
// cache = {cache}