import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

const backend = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            if (!response.data.user.is_admin) {
                navigate("/error/admin");
            }
        } catch (error) {
            navigate("/error/login");
        }
    };

    useEffect(() => {
        getUser();
    });

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Admin</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Admin</Breadcrumb.Item>
            </Breadcrumb>

            <div className="w-48 mx-auto flex flex-col">
                <button
                    className="my-2 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                    type="button"
                    onClick={() => navigate("/account/admin/users")}
                >
                    Manage Users
                </button>
                <button
                    className="my-2 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                    type="button"
                    onClick={() => navigate("/account/admin/reviews")}
                >
                    Manage Reviews
                </button>
            </div>
        </div>
    );
};

export default Admin;
