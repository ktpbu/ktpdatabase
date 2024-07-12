import { useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

                sessionStorage.setItem("is_admin", response.data.is_admin);
                sessionStorage.setItem("first", response.data.first);
                sessionStorage.setItem("last", response.data.last);

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
        <div className="w-3/4 mx-auto py-20">
            <h2 className="mt-24 p-3  text-4xl text-start text-[#234c8b]">
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
                    className="my-2 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                    type="button"
                    onClick={handleGoogleAuth}
                >
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default Home;
