import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="w-full mx-auto px-12 flex flex-wrap justify-around bg-[#ffffff]">
            <div className="w-fit my-3 text-[#8bb9ff]">
                &#169; 2023 Kappa Theta Pi Lambda Chapter
            </div>
            <div className="w-fit my-3">
                <Link
                    className="mx-2 text-[#8bb9ff]"
                    to="https://ktpbostonu.com/"
                    target="_blank"
                >
                    <LanguageIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff]"
                    to="https://www.instagram.com/ktpbostonu/"
                    target="_blank"
                >
                    <InstagramIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff]"
                    to="https://www.linkedin.com/company/kappa-theta-pi-lambda-chapter/"
                    target="_blank"
                >
                    <LinkedInIcon />
                </Link>
                <Link
                    className="mx-2 text-[#8bb9ff]"
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
