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
            <a href="https://www.instagram.com/ktpbostonu/" target="_blank" rel="noopener noreferrer"style={{ color: 'inherit', textDecoration: 'none' }}>
                    <InstagramIcon className="mx-2" />
                </a>
                <a href="https://www.linkedin.com/company/kappa-theta-pi-lambda-chapter/" target="_blank" rel="noopener noreferrer"style={{ color: 'inherit', textDecoration: 'none' }}>
                    <LinkedInIcon className="mx-2" />
                </a>
                <a href="https://github.com/ktpbu" target="_blank" rel="noopener noreferrer"style={{ color: 'inherit', textDecoration: 'none' }}>
                    <GitHubIcon className="mx-2" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
