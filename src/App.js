//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import socketio from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'

import Header from './components/Header';
import VesselContainer from './components/VesselContainer';
import LogButtons from './components/LogButtons';
import NewAlert from './components/Alert';
import VesselSetting from './components/VesselSetting';
import HighChart from './components/Highchart';
import Timer from './components/Timer';
import ModeSet from './components/ModeSet';

const ENDPOINT = "http://192.168.0.31:5000";
// const ENDPOINT = "http://174.160.237.133:81/";
const socket = socketio.connect(ENDPOINT);
export { socket, ENDPOINT };

function App() {
  const [cache, set_cache] = useState("");
  const [mode, set_mode] = useState("");

  useEffect(() => {
    let isMounted = true
    
    socket.on("connect", msg => {
      if (isMounted) {
        console.log("Connected to socket.io server!")
        socket.emit('connected')
        socket.emit('get_cache')
      }});
    socket.on("cache", cache => {
      if (isMounted) {
        // console.log(JSON.stringify(cache))
        set_cache(cache);
        set_mode(cache['SYSTEM']['Static']['Mode'])
      }});
    return () => { 
        console.log('Unmounted Home');
        isMounted = false;
    }; 
  }, []);

  let home
  let settings
  try {
    if (mode === 'Smoke') {
      home = <VesselContainer vessel_name = 'Smoker' cache = {cache}/>;
      settings = <VesselSetting vessel_name = 'Smoker' cache = {cache}/>}
    else if (mode === 'Brew') {
      home = [<VesselContainer key = '1' vessel_name = 'Boil_Kettle' cache = {cache}/>,
              <VesselContainer key = '2' vessel_name = 'Mash_Tun' cache = {cache}/>,
              <VesselContainer key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache}/>];
      settings = [<VesselSetting key = '1' vessel_name = 'Boil_Kettle' cache = {cache}/>,
                  <VesselSetting key = '2' vessel_name = 'Mash_Tun' cache = {cache}/>,
                  <VesselSetting key = '3' vessel_name = 'Hot_Liquor_Tank' cache = {cache}/>]}          
    else if (mode === 'Ferment') {home = <VesselContainer vessel_name = 'Fermenter' cache = {cache}/>;
                                  settings = <VesselSetting vessel_name = 'Fermenter' cache = {cache}/>}
  } catch(err){console.log('Failed to Load Vessel')}

  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/">
              <Container fluid>
                <Row>
                  {home}
                </Row>
              </Container>
                <LogButtons />
                <Timer />
              </Route>
              <Route exact path="/chart">
                <Container fluid>
                  <HighChart />
                </Container>
              </Route>
              <Route path="/settings">
                <ModeSet cache = {cache} />
                {settings}
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