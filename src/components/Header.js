import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap'
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Header () {
  var [date,setDate] = useState(new Date());
 
  useEffect(() => {
    var timer = setInterval(()=>setDate(new Date()), 1000 )
    
    return () => {
      clearInterval(timer);
    }
  }, []);

  return(
    // <div>
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Container fluid bg="light" className="mr-auto">
        <Navbar.Brand >MoonBrewCo.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">       
            <br></br>
            <LinkContainer to="/">
              <Nav.Link className="ms-auto">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chart">
              <Nav.Link className="ms-auto">Chart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link className="ms-auto">Settings</Nav.Link>
            </LinkContainer>
            </Nav>
          <Nav className="ms-auto">
              <Navbar.Text className="ms-auto">
                  <small>{date.toLocaleDateString()} | {date.toLocaleTimeString()}</small>
              </Navbar.Text>
          </Nav>
        </Navbar.Collapse>  
      </Container>
    </Navbar>
    // </div>
  );
};

export default Header;