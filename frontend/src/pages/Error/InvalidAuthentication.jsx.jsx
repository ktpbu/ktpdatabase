import { useNavigate } from "react-router-dom";

const InvalidAuthentication = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h1 className="mt-16 text-2xl text-left text-[#234c8b]">
                {
                    "Only KTP's Lambda Chapter (Boston University) can access this website. If you're a member of this chapter, ensure that you're signing in with your BU Google account. If you believe there has been a mistake, try refreshing the page. If the issue persists, contact the head of the app committee."
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

export default InvalidAuthentication;
