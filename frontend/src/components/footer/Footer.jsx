import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="mx-auto p-3 flex flex-wrap justify-around bg-gray-100">
            <div className="text-gray-500">
                &#169; 2023, Kappa Theta Pi Lambda Chapter
            </div>
            <div>
                <InstagramIcon className="mx-2" />
                <LinkedInIcon className="mx-2" />
                <GitHubIcon className="mx-2" />
            </div>
        </footer>
    );
};

export default Footer;
