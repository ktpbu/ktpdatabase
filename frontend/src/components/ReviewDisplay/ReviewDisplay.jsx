import PropTypes from "prop-types";

import "./ReviewDisplay.css";

const ReviewDisplay = ({ reviews }) => {
    const formatDate = (input) => {
        const date = new Date(input);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    return (
        <>
            {reviews && reviews.length > 0 ? (
                <div className="review-display">
                    <h2 className="review-display-title">Reviews</h2>
                    <div className="review-display-container">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="review-display-item-container"
                            >
                                <h6>{formatDate(review.date)}</h6>
                                <p className="review-display-professor">
                                    {review.professor}
                                </p>
                                <div className="review-display-metrics">
                                    <p>Usefulness: {review.usefulness}</p>
                                    <p>Difficulty: {review.difficulty}</p>
                                    <p>Rating: {review.rating}</p>
                                </div>
                                {review.review ? (
                                    <p className="review-display-review">
                                        {review.review}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

ReviewDisplay.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            anon: PropTypes.bool.isRequired,
            courseID: PropTypes.string.isRequired,
            professor: PropTypes.string.isRequired,
            usefulness: PropTypes.number.isRequired,
            difficulty: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            review: PropTypes.string,
            date: PropTypes.string.isRequired,
        })
    ),
};

export default ReviewDisplay;
