import { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import ReviewDisplay from "../../components/ReviewDisplay";
import Spinner from "../../components/Spinner";

const backend = import.meta.env.VITE_BACKEND_URL;

const Reviews = () => {
    const [user, setUser] = useState(null);
    const first = sessionStorage.getItem("first");

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
            <h2 className="p-3 text-start text-[#234c8b]">
                {`${first}'s`} Reviews
            </h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Reviews"
            />

            {loading ? (
                <Spinner className="mt-16" />
            ) : userReviews && userReviews.length > 0 ? (
                <ReviewDisplay reviews={userReviews} view="account" />
            ) : (
                <p className="text-2xl">You have not added any reviews.</p>
            )}
        </div>
    );
};

export default Reviews;
