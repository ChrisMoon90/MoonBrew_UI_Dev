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
  console.log('Main App Render')

  const [cache, set_cache] = useState("")

  useEffect(() => {
    let isMounted = true

    socket.on("connect", msg => {
      if (isMounted) {
        console.log("Connected to socket.io server!")
        }
      }
    )

    socket.on("cache", cache => {
      if (isMounted) {
        console.log('Main Cache Update', cache)
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
      home = <VesselContainer vessel_name = 'Smoker' cache = {cache}/>;
      settings = <VesselConfig vessel_name = 'Smoker' cache = {cache}/>}
    else if (mode === 'Brew') {
      home = [<VesselContainer key = '1' vessel_name = 'Boil_Kettle' cache = {cache}/>,
              <VesselContainer key = '2' vessel_name = 'Mash_Tun' cache = {cache}/>,
              <VesselContainer key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache}/>];
      settings = [<VesselConfig key = '1' vessel_name = 'Boil_Kettle' cache = {cache}/>,
                  <VesselConfig key = '2' vessel_name = 'Mash_Tun' cache = {cache}/>,
                  <VesselConfig key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache}/>]}          
    else if (mode === 'Ferment') {home = <VesselContainer vessel_name = 'Fermenter' cache = {cache}/>;
                                  settings = <VesselConfig vessel_name = 'Fermenter' cache = {cache}/>}
    else {home = 'Waiting for connection to server...';
          settings = 'Waiting for connection to server...'}
  } catch(err){}

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
              <Route path="/config">
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
  )
}

export default App;