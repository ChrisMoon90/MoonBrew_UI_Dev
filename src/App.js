//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import socketio from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import BrewContainer from './components/BrewContainer';
import FermContainer from './components/FermContainer';
// import SmokerTempTable from './components/SmokerTempTable';
import SmokerContainer from './components/SmokerContainer';
import LogButtons from './components/LogButtons';
import NewAlert from './components/Alert';
import FanTableSet from './components/FanTableSet';
import TempTableSet from './components/TempTableSet';
import TempControlTable from './components/TempControlTable';
import HighChart from './components/Highchart';
import Timer from './components/Timer';
import ModeSet from './components/ModeSet';

// const ENDPOINT = "http://192.168.0.31:5000";
const ENDPOINT = "http://98.51.132.233:81";
const socket = socketio.connect(ENDPOINT);
export { socket, ENDPOINT };


function App() {
  const [cache, set_cache] = useState("");
  const [mode, set_mode] = useState("");
  // var mode = ''
  // try {
  //   console.log('Trying to Load Cache...')
  //   // mode = cache['SYSTEM']['Mode']}
  // catch(err){console.log('Failed to Load Cache')}

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
        console.log(JSON.stringify(cache))
        set_cache(cache);
        set_mode(cache['SYSTEM']['Mode'])
      }});
    return () => { 
        console.log('Unmounted Home');
        isMounted = false;
    }; 
  }, []);

  var home
  if (mode === 'Brew') {
    home = <Container fluid><BrewContainer cache = {cache}/></Container>;
  } else if (mode === 'Ferment') {
    home = <Container fluid>
    <Row>
      <Col><FermContainer /></Col>
    </Row>
  </Container>;
  } else {
    home = <Container fluid>
    <Row>
      <Col><SmokerContainer cache = {cache}/></Col>
    </Row>
  </Container>;
  }

  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/">
                {home}
                <Container>
                <LogButtons />
                <Timer />
                </Container>
              </Route>
              <Route exact path="/chart">
                <Container fluid>
                  <HighChart />
                </Container>
              </Route>
              <Route path="/settings">
                <ModeSet cache = {cache} />
                <TempTableSet />
                <TempControlTable />
                <FanTableSet />
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