import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="d-flex mx-auto justify-content-around p-3 footer">
            <div className="copyright">
                &#169; 2023, Kappa Theta Pi Lambda Chapter
            </div>
            <div> 
                <i className="bi bi-instagram"></i>
                <i className="bi bi-github"></i>
                <i className="bi bi-linkedin"></i>
            </div>
        </footer>
    );
};

export default Footer;