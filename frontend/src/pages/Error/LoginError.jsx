import { useNavigate } from "react-router-dom";

const LoginError = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h1 className="mt-16 text-3xl text-[#234c8b]">
                User must be authenticated to access the KTP Database
            </h1>
            <button
                className="my-16 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl bg-white"
                type="button"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </div>
    );
};

export default LoginError;
