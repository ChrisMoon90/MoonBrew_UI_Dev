import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

function Header () {
  var [date,setDate] = useState(new Date());

  const version = 'v2.0'
 
  useEffect(() => {
    var timer = setInterval(()=>setDate(new Date()), 1000 )
    
    return () => {
      clearInterval(timer);
    }
  }, []);

  return(
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Container fluid bg="light" className="mr-auto">
        <Navbar.Brand >MoonBrew&nbsp;<small><small><small>{version}</small></small></small></Navbar.Brand>
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
            <NavDropdown title="Settings" id="basic-nav-dropdown" className="ms-auto">
              <NavDropdown.Item href="/system">System</NavDropdown.Item>
              <NavDropdown.Item href="/diagnostics">Diagnostics</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
              <Navbar.Text className="ms-auto">
                  <small>{date.toLocaleDateString()} | {date.toLocaleTimeString()}</small>
              </Navbar.Text>
          </Nav>
        </Navbar.Collapse>  
      </Container>
    </Navbar>
  );
};

export default Header;