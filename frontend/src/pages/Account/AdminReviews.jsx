import { Breadcrumb } from "react-bootstrap";

const AdminReviews = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Manage Reviews</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Reviews</Breadcrumb.Item>
            </Breadcrumb>{" "}
        </div>
    );
};

export default AdminReviews;
