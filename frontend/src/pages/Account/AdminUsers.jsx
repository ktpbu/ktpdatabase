import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import UserDisplay from "../../components/UserDisplay";

const backend = import.meta.env.VITE_BACKEND_URL;

const AdminUsers = () => {
    const navigate = useNavigate();

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
            <h2 className="p-3 text-start text-[#234c8b]">Manage Users</h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Admin", path: "/account/admin" },
                ]}
                current="Manage Users"
            />

            <UserDisplay users={users} />

            <button
                className="mt-8 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                type="button"
                onClick={() => navigate("/account/admin/users/add")}
            >
                Add User
            </button>
        </div>
    );
};

export default AdminUsers;
