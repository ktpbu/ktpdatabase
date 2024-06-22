import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const AdminUsers = () => {
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
            <h2 className="text-start p-3">Manage Users</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Users</Breadcrumb.Item>
            </Breadcrumb>{" "}
        </div>
    );
};

export default AdminUsers;
