import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleLoginButton = () => {
        navigate("/login");
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Kappa Theta Pi</h2>

            <div className="text-start p-3">
                Welcome to Kappa Theta Pi Lambda Chapter's brother website.
            </div>

            <button type="button" onClick={handleLoginButton}>
                Login
            </button>
        </div>
    );
};

export default Home;
