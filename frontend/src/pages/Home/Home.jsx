import { useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import googlelogo from "../../assets/googlelogo.png";

const backend = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const token = await result.user.getIdToken();
            try {
                const response = await axios.post(
                    `${backend}/auth/protected`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: token,
                        },
                    }
                );

                localStorage.setItem("is_admin", response.data.is_admin);
                localStorage.setItem("first", response.data.first);
                localStorage.setItem("last", response.data.last);

                navigate("/", { replace: true });
            } catch (error) {
                console.log(error);
                navigate("/error/authentication");
                auth.signOut();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-3/4 mx-auto pt-20">
            <h2 className="sm:mt-24 p-3 text-4xl text-start text-[#234c8b]">
                Welcome to the KTP Database!
            </h2>

            <div className="text-start text-xl p-3">
                <p>
                    One central location for all of your academic and
                    professional needs.
                </p>
            </div>

            {!user && (
                <button
                    className="w-60 mx-auto my-2 p-2 text-xl flex justify-around border-2 border-solid hover:border-[#234c8b] rounded-3xl bg-white"
                    type="button"
                    onClick={handleGoogleAuth}
                >
                    <img className="w-8" src={googlelogo} />
                    <span className="my-auto">Sign in with Google</span>
                </button>
            )}
        </div>
    );
};

export default Home;
