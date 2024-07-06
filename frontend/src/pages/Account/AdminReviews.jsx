import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import axios from "axios";

import ReviewDisplay from "../../components/ReviewDisplay";
import Spinner from "../../components/Spinner";

const backend = import.meta.env.VITE_BACKEND_URL;

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        try {
            const reviewsResponse = await axios.get(
                `${backend}/account/admin/get-reviews`
            );
            setReviews(reviewsResponse.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Manage Reviews</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Reviews</Breadcrumb.Item>
            </Breadcrumb>{" "}
            {loading ? (
                <Spinner className="mt-16" />
            ) : reviews && reviews.length > 0 ? (
                <ReviewDisplay reviews={reviews} view="admin" />
            ) : (
                <p className="text-2xl">User has not submitted any reviews.</p>
            )}
        </div>
    );
};

export default AdminReviews;
