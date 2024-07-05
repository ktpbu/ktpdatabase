import { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import ReviewDisplay from "../../components/ReviewDisplay";
import Spinner from "../../components/Spinner/Spinner";

const backend = import.meta.env.VITE_BACKEND_URL;

const Reviews = () => {
    const [user, setUser] = useState(null);
    const first = localStorage.getItem("first");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                return;
            }
            setUser(null);
        });
        return () => unsubscribe();
    }, []);

    const [userReviews, setUserReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserReviews = async () => {
            if (!user.email) {
                return;
            }
            try {
                setLoading(true);
                const response = await axios.post(
                    `${backend}/account/reviews/get-user-reviews`,
                    { bu_email: user.email }
                );
                setUserReviews(response.data);
            } catch (error) {
                console.log("error fetching user reviews:", error);
            }
            setLoading(false);
        };
        getUserReviews();
    }, [user]);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">{`${first}'s`} Reviews</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Reviews</Breadcrumb.Item>
            </Breadcrumb>

            {loading ? (
                <Spinner className="mt-16" />
            ) : userReviews && userReviews.length > 0 ? (
                <ReviewDisplay reviews={userReviews} view="account" />
            ) : (
                <p className="text-2xl">User has not submitted any reviews.</p>
            )}
        </div>
    );
};

export default Reviews;
