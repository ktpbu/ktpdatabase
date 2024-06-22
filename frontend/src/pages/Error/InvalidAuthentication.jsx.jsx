import { useNavigate } from "react-router-dom";

const InvalidAuthentication = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto py-20">
            <h1 className="mt-16 text-2xl text-left">
                {
                    "Only members of Kappa Theta Pi's Lambda Chapter (Boston University) can access this website. If you are a member of this chapter, ensure that you are signing in with you BU Google account. If you believe there is an error, contact the head of the app committee."
                }
            </h1>
            <button
                className="my-16 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </div>
    );
};

export default InvalidAuthentication;
