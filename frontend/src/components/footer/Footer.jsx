import "bootstrap-icons/font/bootstrap-icons.css";
import Container from "react-bootstrap/container";

import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <Container className="mx-auto customContainer d-flex flex-column justify-content-center">
                <div className="m-2"><b>&#169;</b> Kappa Theta Pi BU</div>
                <div>
                    <i className="d-inline bi bi-instagram"></i>
                    <i className="d-inline bi bi-linkedin"></i>
                    <i className="d-inline bi bi-github"></i>
                </div>
            </Container>
        </div>
    );
};

export default Footer;