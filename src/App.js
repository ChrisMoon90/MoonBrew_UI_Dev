//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import socketio from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import TempTable from './components/TempTable';
import FanTable from './components/FanTable';
import LogButtons from './components/LogButtons';
import NewAlert from './components/Alert';
import FanTableSet from './components/FanTableSet';
import TempTableSet from './components/TempTableSet';


const ENDPOINT = "http://192.168.0.31:5000";
const socket = socketio.connect(ENDPOINT);
export { socket };



function App() {

  useEffect(() => {
    socket.on("connect", msg => {
      console.log("Connect to socket.io server!")
    });
  }, []);

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
                    <Col><TempTable /></Col>
                    <Col><FanTable /></Col>
                  </Row>
                </Container>
                <LogButtons />
              </Route>
              <Route path="/settings">
                <TempTableSet />
                <FanTableSet />
              </Route>
            </Switch>
          </div>
          <div className="Alerts">
            <NewAlert />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;