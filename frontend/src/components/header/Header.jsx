import { useEffect, useState } from "react";
import Container from "react-bootstrap/container";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/nav";
import Navbar from "react-bootstrap/navbar";
import axios from "axios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const backend = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

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

    const handleProfile = () => {
        console.log("profile");
    };

    const handleReviews = () => {
        console.log("reviews");
    };

    const handleLogout = () => {
        window.open(`${backend}/auth/google/logout`, "_self");
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: userData.is_admin ? 350 : 300,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="w-full mx-auto">
            <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <span className="text-2xl">KTP Database</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link eventKey="1">
                                <Link
                                    className="text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="2">
                                <Link
                                    className="text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/academics"
                                >
                                    Academics
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="3">
                                <Link
                                    className="text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/professional"
                                >
                                    Professional
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey="4">
                                <Link
                                    className="text-xl text-black no-underline hover:underline duration-200 ease-linear"
                                    to="/calendar"
                                >
                                    Calendar
                                </Link>
                            </Nav.Link>

                            {Object.keys(userData).length > 0 && (
                                <button onClick={handleModalOpen}>
                                    <AccountCircleIcon
                                        className="m-auto"
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
                                        <h2 className="text-center">{`${userData?.first} ${userData?.last}`}</h2>
                                        <div
                                            className={`${
                                                userData.is_admin
                                                    ? "h-56"
                                                    : "h-40"
                                            } mt-4 flex flex-col justify-between`}
                                        >
                                            {userData.is_admin && (
                                                <button
                                                    className="w-24 mx-auto p-2 block text-xl border-2 border-solid hover:border-black rounded-3xl"
                                                    type="button"
                                                    onClick={handleAdmin}
                                                >
                                                    Admin
                                                </button>
                                            )}
                                            <button
                                                className="w-24 mx-auto p-2 block text-xl border-2 border-solid hover:border-black rounded-3xl"
                                                type="button"
                                                onClick={handleProfile}
                                            >
                                                Profile
                                            </button>
                                            <button
                                                className="w-24 mx-auto p-2 block text-xl border-2 border-solid hover:border-black rounded-3xl"
                                                type="button"
                                                onClick={handleReviews}
                                            >
                                                Reviews
                                            </button>
                                            <button
                                                className="w-24 mx-auto p-2 block text-xl border-2 border-solid hover:border-black rounded-3xl"
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
