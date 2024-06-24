import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

const backend = import.meta.env.VITE_BACKEND_URL;

const Directory = () => {
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        try {
            await axios.get(`${backend}/auth/google/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">
                Kappa Theta Pi Lambda Chapter Directory
            </h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Directory</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Directory;
