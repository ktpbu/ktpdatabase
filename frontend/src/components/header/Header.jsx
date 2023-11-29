import Container from "react-bootstrap/container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/nav";
import Navbar from "react-bootstrap/navbar";

import "./Header.css";

const Header = () => {
  return (
    <div className="nav-container">
      <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="nav-brand" href="/">
            KTP Database
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link eventKey="1">
                <Link className="navLink" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="2">
                <Link className="navLink" to="/academics">
                  Academics
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="3">
                <Link className="navLink" to="/professional">
                  Professional
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="4">
                <Link className="navLink" to="/calendar">
                  Calendar
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
