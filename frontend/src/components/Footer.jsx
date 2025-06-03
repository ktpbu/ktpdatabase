import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="w-full mx-auto mb-2 px-24 flex flex-wrap justify-around sm:justify-between bg-[#ffffff]">
            <div className="w-fit my-2 text-[#8bb9ff]">
                &#169; {new Date().getFullYear()} Kappa Theta Pi Lambda Chapter
                | v1.0.1
            </div>
            <div className="w-fit my-2">
                <Link
                    className="mx-2 text-[#8bb9ff] hover:text-[#234c8b]"
                    to="https://ktpbostonu.com/"
                    target="_blank"
                >
                    <LanguageIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff] hover:text-[#234c8b]"
                    to="https://www.instagram.com/ktpbostonu/"
                    target="_blank"
                >
                    <InstagramIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff] hover:text-[#234c8b]"
                    to="https://www.linkedin.com/company/kappa-theta-pi-lambda-chapter/"
                    target="_blank"
                >
                    <LinkedInIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff] hover:text-[#234c8b]"
                    to="https://github.com/ktpbu"
                    target="_blank"
                >
                    <GitHubIcon />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
