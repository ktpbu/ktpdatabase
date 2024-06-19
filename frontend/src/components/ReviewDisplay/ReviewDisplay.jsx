import PropTypes from "prop-types";

const ReviewDisplay = ({ reviews }) => {
    const formatDate = (input) => {
        const date = new Date(input);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    return (
        <div>
            <h2 className="">Reviews</h2>
            <div className="w-144 max-w-full h-96 overflow-y-scroll mx-auto flex flex-col justify-around border-2 border-black">
                {reviews.map((review, index) => (
                    <div
                        key={review._id}
                        className={`w-112 h-fit mx-auto mt-4 ${
                            index === reviews.length - 1 && "mb-4"
                        } flex flex-col flex-around border-1 border-gray-200 rounded-md bg-purple-100`}
                    >
                        <div className="w-96 mt-4 mx-auto flex justify-between">
                            <p className="my-auto text-xl font-semibold text-left">
                                Author
                            </p>
                            <p className="my-auto text-xl text-right">
                                {review.anon ? "Anonymous" : review.user}
                            </p>
                        </div>
                        <div className="w-96 mt-4 mx-auto flex justify-between">
                            <p className="my-auto text-xl font-semibold text-left">
                                Date
                            </p>
                            <p className="my-auto text-xl text-right">
                                {formatDate(review.date)}
                            </p>
                        </div>
                        <div className="w-96 mt-4 mx-auto flex justify-between">
                            <p className="my-auto text-xl font-semibold text-left">
                                Professor
                            </p>
                            <p className="my-auto text-xl text-right">
                                {review.professor}
                            </p>
                        </div>

                        <div
                            className={`w-96 mx-auto ${
                                review.review ? "mt-4" : "my-4"
                            } flex flex-wrap justify-between text-xl`}
                        >
                            <p className="my-auto">
                                <span className="font-semibold">
                                    Usefulness:
                                </span>{" "}
                                {review.usefulness}
                            </p>
                            <p className="my-auto">
                                <span className="font-semibold">
                                    Difficulty:
                                </span>{" "}
                                {review.difficulty}
                            </p>
                            <p className="my-auto">
                                <span className="font-semibold">Rating:</span>{" "}
                                {review.rating}
                            </p>
                        </div>

                        {review.review && (
                            <div className="my-4 mx-4 text-xl">
                                <p className="my-auto">{review.review}</p>
                            </div>
                        )}
                    </div>
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
