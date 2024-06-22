import { useState, useEffect } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const handleGoogleAuth = () => {
        window.open("http://localhost:3000/auth/google/callback", "_self");
    };

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

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Kappa Theta Pi</h2>

            <div className="text-start p-3">
                <p>
                    {
                        "Welcome to Kappa Theta Pi Lambda Chapter's brother website."
                    }
                </p>
            </div>

            {Object.keys(userData).length === 0 && (
                <button type="button" onClick={handleGoogleAuth}>
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default Home;
