import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
            if (!userData.is_admin) {
                navigate("/error/admin");
            }
        } catch (error) {
            navigate("/error/login");
        }
    };

    useEffect(() => {
        getUser();
    });
    return <div>Admin</div>;
};

export default Admin;
