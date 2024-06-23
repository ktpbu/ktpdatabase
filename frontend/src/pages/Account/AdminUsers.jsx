import { useEffect, useState, useCallback } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserDisplay from "../../components/UserDisplay/UserDisplay";

const backend = import.meta.env.VITE_BACKEND_URL;

const AdminUsers = () => {
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
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
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const usersResponse = await axios.get(
                `${backend}/account/admin/get-users`
            );
            setUsers(usersResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Manage Users</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Users</Breadcrumb.Item>
            </Breadcrumb>{" "}
            <UserDisplay users={users} />
            <button
                className="mt-8 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                type="button"
                onClick={() => navigate("/account/admin/users/add")}
            >
                Add User
            </button>
        </div>
    );
};

export default AdminUsers;
