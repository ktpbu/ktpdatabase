import { useNavigate } from "react-router-dom";

const InvalidAdmin = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h1 className="mt-16 text-2xl text-left text-[#234c8b]">
                {
                    "Only admins can access this page. If you believe there has been a mistake, contact the head of the app committee."
                }
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

export default InvalidAdmin;
