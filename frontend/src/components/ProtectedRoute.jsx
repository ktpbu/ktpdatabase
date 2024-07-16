import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, user, admin }) => {
    const isAdmin = localStorage.getItem("is_admin");
    return user ? (
        admin ? (
            isAdmin === "true" ? (
                children
            ) : (
                <Navigate to="/error/admin" />
            )
        ) : (
            children
        )
    ) : (
        <Navigate to="/error/login" />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
    admin: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
