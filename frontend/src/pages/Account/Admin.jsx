import { useNavigate } from "react-router-dom";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const Admin = () => {
    const navigate = useNavigate();

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Admin</h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Admin"
            />

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
