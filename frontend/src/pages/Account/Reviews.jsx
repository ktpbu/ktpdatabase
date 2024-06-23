import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import Spinner from "../../components/Spinner/Spinner";

const backend = import.meta.env.VITE_BACKEND_URL;

const Reviews = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [userReviews, setUserReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${backend}/account/reviews/get-user-reviews`,
                    { bu_email: userData.bu_email }
                );
                setUserReviews(response.data);
            } catch (error) {
                console.log("error fetching user reviews:", error);
            }
            setLoading(false);
        };
        getUserReviews();
    }, [userData.bu_email]);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">{`${userData.first}'s`} Reviews</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Reviews</Breadcrumb.Item>
            </Breadcrumb>

            {loading ? (
                <Spinner className="mt-16" />
            ) : (
                userReviews &&
                userReviews.length > 0 && (
                    <ReviewDisplay reviews={userReviews} view="account" />
                )
            )}
        </div>
    );
};

export default Reviews;
