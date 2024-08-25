import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

import DeleteReviewModal from "./DeleteReviewModal";
import ReviewFilter from "./ReviewFilter";
import { ReviewFilterContext } from "../contexts/ReviewFilterContext.jsx";

const ReviewDisplay = ({ reviews, view }) => {
    const [state] = useContext(ReviewFilterContext);
    const formatDate = (input) => {
        const date = new Date(input);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    const [filteredReviews, setFilteredReviews] = useState([]);

    useEffect(() => {
        setFilteredReviews(
            reviews.filter(
                (review) =>
                    review.usefulness >= state.minUsefulness.value &&
                    review.usefulness <= state.maxUsefulness.value &&
                    review.difficulty >= state.minDifficulty.value &&
                    review.difficulty <= state.maxDifficulty.value &&
                    review.rating >= state.minRating.value &&
                    review.rating <= state.maxRating.value
            )
        );
    }, [reviews, state]);

    const [search, setSearch] = useState("");

    const handleReviewSearch = ({ searchText }) => {
        const searchLower = searchText.trim().toLowerCase();
        setSearch(searchLower);

        if (searchLower === "") {
            setFilteredReviews(reviews);
        } else {
            const searchFilteredReviews = reviews.filter((review) => {
                return (
                    (review.anon && "anonymous".includes(searchLower)) ||
                    (!review.anon &&
                        review.user.toLowerCase().includes(searchLower)) ||
                    review.professor.toLowerCase().includes(searchLower) ||
                    review.course_id.toLowerCase().includes(searchLower) ||
                    review.usefulness.toString().includes(searchLower) ||
                    review.difficulty.toString().includes(searchLower) ||
                    review.rating.toString().includes(searchLower) ||
                    review.review.toLowerCase().includes(searchLower)
                );
            });
            setFilteredReviews(searchFilteredReviews);
        }
    };

    return (
        <div>
            <div className="my-4 flex justify-between">
                <div className="mx-3">
                    <div className="text-2xl sm:text-4xl text-[#234c8b]">
                        {(
                            reviews
                                .map((review) => review.usefulness)
                                .reduce((acc, curr) => acc + curr, 0) /
                            reviews.length
                        ).toFixed(1)}
                    </div>
                    <h4 className="text-sm sm:text-2xl">Average Usefulness</h4>
                </div>
                <div className="mx-3">
                    <div className="text-2xl sm:text-4xl text-[#234c8b]">
                        {(
                            reviews
                                .map((review) => review.difficulty)
                                .reduce((acc, curr) => acc + curr, 0) /
                            reviews.length
                        ).toFixed()}
                    </div>
                    <h4 className="text-sm sm:text-2xl">Average Difficulty</h4>
                </div>
                <div className="mx-3">
                    <div className="text-2xl sm:text-4xl text-[#234c8b]">
                        {(
                            reviews
                                .map((review) => review.rating)
                                .reduce((acc, curr) => acc + curr, 0) /
                            reviews.length
                        ).toFixed(1)}
                    </div>
                    <h4 className="text-sm sm:text-2xl">Average Rating</h4>
                </div>
            </div>

            {view !== "account" && (
                <h2 className="text-[#234c8b]">Reviews ({reviews.length})</h2>
            )}
            <ReviewFilter />
            <div className="my-4">
                <input
                    placeholder="Search for review..."
                    name="review"
                    value={search}
                    className="w-48 h-8 p-2 border-1 border-gray-300 rounded-md"
                    onChange={(e) => {
                        handleReviewSearch({
                            searchText: e.target.value,
                        });
                    }}
                ></input>
            </div>
            <div className="w-144 min-w-80 max-w-full h-96 overflow-x-hidden overflow-y-scroll mx-auto flex flex-col justify-around border-2 border-[#234c8b]">
                {filteredReviews.map((review, index) => (
                    <Card
                        key={index}
                        className={`w-72 sm:w-112 max-w-full h-fit mx-2 mt-4 ${
                            index === filteredReviews.length - 1 && "mb-4"
                        } flex flex-col self-center flex-around border-1 border-gray-200 rounded-md`}
                    >
                        <Card.Header>
                            <div className="w-full mx-auto flex justify-between">
                                <p className="my-auto text-xl font-semibold text-right">
                                    {review.anon ? "Anonymous" : review.user}
                                </p>
                                <p className="my-auto text-xl font-semibold text-right">
                                    {formatDate(review.date)}
                                </p>
                            </div>
                        </Card.Header>
                        <Card.Body className="my-auto bg-[#8bb9ff]">
                            <div className="w-full mx-auto sm:flex sm:justify-between">
                                <p className="text-xl text-left">
                                    Professor{" "}
                                    <span className="font-semibold">
                                        {review.professor}
                                    </span>
                                </p>
                                <p className="text-xl text-left">
                                    <span className="font-semibold">
                                        {review.course_id}
                                    </span>
                                </p>
                            </div>
                            <div className="w-full mx-auto sm:flex sm:justify-between">
                                <p className="text-xl text-left">
                                    Usefulness:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.usefulness}
                                    </span>
                                    /5
                                </p>
                                <p className="text-xl text-left">
                                    Difficulty:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.difficulty}
                                    </span>
                                    /5
                                </p>
                                <p className="text-xl text-left">
                                    Rating:{" "}
                                    <span className="text-2xl font-semibold">
                                        {review.rating}
                                    </span>
                                    /5
                                </p>
                            </div>
                            {review.review && (
                                <Card.Text className="w-full mx-auto text-xl text-start">
                                    {review.review}
                                </Card.Text>
                            )}
                            <div
                                className={`w-24 max-w-full mx-auto flex ${
                                    view === "account"
                                        ? "justify-between"
                                        : "justify-center"
                                }`}
                            >
                                {view === "account" && (
                                    <Link
                                        className="text-black"
                                        to={`/account/reviews/edit-review/${review._id}`}
                                    >
                                        <EditIcon />
                                    </Link>
                                )}
                                <DeleteReviewModal
                                    courseId={review.course_id}
                                    professor={review.professor}
                                    id={review._id}
                                    deleteItem="Review"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

ReviewDisplay.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            anon: PropTypes.bool.isRequired,
            bu_email: PropTypes.string.isRequired,
            course_id: PropTypes.string.isRequired,
            professor: PropTypes.string.isRequired,
            usefulness: PropTypes.number.isRequired,
            difficulty: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            review: PropTypes.string,
            date: PropTypes.string.isRequired,
        })
    ),
    view: PropTypes.string,
};

export default ReviewDisplay;
