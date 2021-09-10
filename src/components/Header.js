import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
/* import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'; */
import {LinkContainer} from 'react-router-bootstrap'


function Header () {
    return(
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>SmokerPi</Navbar.Brand>
        </LinkContainer>
        <Nav className="links">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/chart">
            <Nav.Link>Chart</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
};

export default Header;