import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="w-full mx-auto px-12 flex flex-wrap justify-around bg-[#234c8b]">
            <div className="w-fit my-3 text-white">
                &#169; 2023, Kappa Theta Pi Lambda Chapter
            </div>
            <div className="w-fit my-3">
                <Link
                    className="mx-2 text-white"
                    to="https://www.instagram.com/ktpbostonu/"
                >
                    <InstagramIcon />
                </Link>
                <Link
                    className="mx-2 text-white"
                    to="https://www.linkedin.com/company/kappa-theta-pi-lambda-chapter/"
                >
                    <LinkedInIcon />
                </Link>
                <Link className="mx-2 text-white" to="https://github.com/ktpbu">
                    <GitHubIcon />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
