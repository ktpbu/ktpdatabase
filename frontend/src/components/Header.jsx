import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const Header = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                return;
            }
            setUser(null);
        });
        return () => unsubscribe();
    });

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleAdmin = () => {
        navigate("/account/admin");
        setModalOpen(false);
    };

    const handleDirectory = () => {
        navigate("/account/directory");
        setModalOpen(false);
    };

    const handleReviews = () => {
        navigate("/account/reviews");
        setModalOpen(false);
    };

    const handleLogout = () => {
        setModalOpen(false);
        setUser(null);
        navigate("/");
        auth.signOut();
        sessionStorage.clear();
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 350,
        bgcolor: "background.paper",
        border: "2px solid #234c8b",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="w-full mx-auto">
            <Navbar
                collapseOnSelect
                className="bg-[#8bb9ff]"
                expand="lg"
                fixed="top"
            >
                <Container>
                    <Navbar.Brand href="/">
                        <span className="text-2xl text-white">
                            KTP Database
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link eventKey="1">
                                <Link
                                    className="text-xl text-[#ffffff] no-underline hover:text-[#234c8b] duration-200 ease-linear"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="2">
                                <Link
                                    className="text-xl text-[#ffffff] no-underline hover:text-[#234c8b] duration-200 ease-linear"
                                    to="/academics"
                                >
                                    Academics
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="3">
                                <Link
                                    className="text-xl text-[#ffffff] no-underline hover:text-[#234c8b] duration-200 ease-linear"
                                    to="/professional"
                                >
                                    Professional
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="4">
                                <Link
                                    className="text-xl text-[#ffffff] no-underline hover:text-[#234c8b] duration-200 ease-linear"
                                    to="/calendar"
                                >
                                    Calendar
                                </Link>
                            </Nav.Link>

                            {user && (
                                <button onClick={handleModalOpen}>
                                    <AccountCircleIcon
                                        className="m-auto text-[#ffffff] no-underline hover:text-[#234c8b]"
                                        fontSize="large"
                                    />
                                </button>
                            )}
                            <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Fade in={modalOpen}>
                                    <Box sx={style}>
                                        <h2 className="text-center text-[#234c8b]">{`${user?.displayName}`}</h2>
                                        <div className="h-56 mt-4 flex flex-col justify-between">
                                            <button
                                                className="w-28 mx-auto p-2 block text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                                                type="button"
                                                onClick={handleAdmin}
                                            >
                                                Admin
                                            </button>
                                            <button
                                                className="w-28 mx-auto p-2 block text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                                                type="button"
                                                onClick={handleDirectory}
                                            >
                                                Directory
                                            </button>
                                            <button
                                                className="w-28 mx-auto p-2 block text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                                                type="button"
                                                onClick={handleReviews}
                                            >
                                                Reviews
                                            </button>
                                            <button
                                                className="w-28 mx-auto p-2 block text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                                                type="button"
                                                onClick={handleLogout}
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </Box>
                                </Fade>
                            </Modal>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
