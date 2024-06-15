import Container from "react-bootstrap/container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/nav";
import Navbar from "react-bootstrap/navbar";

const Header = () => {
    return (
        <div className="w-full mx-auto">
            <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <span className="text-xl xl:text-2xl">
                            KTP Database
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link eventKey="1">
                                <Link
                                    className="text-l xl:text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="2">
                                <Link
                                    className="text-l xl:text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/academics"
                                >
                                    Academics
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="3">
                                <Link
                                    className="text-l xl:text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/professional"
                                >
                                    Professional
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="4">
                                <Link
                                    className="text-l xl:text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/calendar"
                                >
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
