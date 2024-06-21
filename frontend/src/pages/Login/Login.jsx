const Login = () => {
    const handleGoogleAuth = () => {
        console.log("sign in with google");
    };
    return (
        <div className="w-3/4 mx-auto py-20">
            <button type="button" onClick={handleGoogleAuth}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
