import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="w-full mx-auto p-3 flex flex-wrap justify-around bg-gray-100">
            <div className="text-gray-500">
                &#169; 2023, Kappa Theta Pi Lambda Chapter
            </div>
            <div>
                <Link
                    className="mx-2 text-black"
                    to="https://www.instagram.com/ktpbostonu/"
                >
                    <InstagramIcon />
                </Link>
                <Link
                    className="mx-2 text-black"
                    to="https://www.linkedin.com/company/kappa-theta-pi-lambda-chapter/"
                >
                    <LinkedInIcon />
                </Link>
                <Link className="mx-2 text-black" to="https://github.com/ktpbu">
                    <GitHubIcon />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
