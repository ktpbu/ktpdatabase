import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";

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

    useEffect(() => {
        const getUserReviews = async () => {
            try {
                const response = await axios.post(
                    `${backend}/account/reviews/get-user-reviews`,
                    { bu_email: userData.bu_email }
                );
                setUserReviews(response.data);
            } catch (error) {
                console.log("error fetching user reviews:", error);
            }
        };
        getUserReviews();
    }, [userData.bu_email]);

    return (
        <div className="w-3/4 mx-auto py-20">
            {userReviews && userReviews.length > 0 && (
                <ReviewDisplay reviews={userReviews} />
            )}
        </div>
    );
};

export default Reviews;
