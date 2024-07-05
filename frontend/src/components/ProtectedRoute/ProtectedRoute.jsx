import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
    return user ? children : <Navigate to="/error/login"></Navigate>;
};
