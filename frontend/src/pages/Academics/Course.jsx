import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import ReviewDisplay from "../../components/ReviewDisplay";
import Spinner from "../../components/Spinner";

const backend = import.meta.env.VITE_BACKEND_URL;

const Course = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { level, id } = useParams();
    const [courseInfo, setCourseInfo] = useState("");
    const [courseReviews, setCourseReviews] = useState([]);

    const subjectMap = useMemo(
        () => ({
            ENGBE: "biomedical-eng",
            CASCS: "computer-science",
            CDSDS: "data-science",
            CASEC: "economics",
            ENGEC: "electrical-computer-eng",
            ENGEK: "eng-core",
            CASMA: "mathematics-statistics",
            ENGME: "mechanical-eng",
        }),
        []
    );

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
            const subject = subjectMap[id.slice(0, 5)];
            await Promise.all([
                axios
                    .get(
                        `${backend}/academics/courses/${level}/${subject}/${id}`
                    )
                    .then((courseResponse) => {
                        setCourseInfo(courseResponse.data[0]);
                    })
                    .catch((error) => {
                        console.error("Error fetching course data:", error);
                    }),
                // not sure why the review request only works with post and not get
                axios
                    .post(`${backend}/academics/courses/reviews/${id}`)
                    .then((reviewResponse) => {
                        setCourseReviews(reviewResponse.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching review data:", error);
                    }),
            ]);
            setLoading(false);
        };
        fetchCourseData();
    }, [id, level, subjectMap]);

    const handleAddReviewButton = () => {
        navigate(`/academics/courses/${level}/${id}/add-review`);
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h2 className="my-auto p-3 text-start text-[#234c8b]">
                        {courseInfo.code}: {courseInfo.name}
                    </h2>

                    <div className="p-3 flex flex-wrap">
                        <p className="mr-1">
                            <a
                                href={"/"}
                                className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                            >
                                Home
                            </a>
                            {" /"}
                        </p>
                        <p className="mr-1">
                            <a
                                href={"/academics"}
                                className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                            >
                                Academics
                            </a>
                            {" /"}
                        </p>
                        {level === "undergrad" ? (
                            <p className="mr-1">
                                <a
                                    href={"/academics/courses"}
                                    className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                                >
                                    Courses
                                </a>
                                {" /"}
                            </p>
                        ) : (
                            <p className="mr-1">
                                <a
                                    href={"/academics/graduate"}
                                    className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                                >
                                    Graduate
                                </a>
                                {" /"}
                            </p>
                        )}
                        <p className="mr-1">{courseInfo.name}</p>
                    </div>

                    <div>
                        {courseInfo.undergrad_prereqs && (
                            <h5 className="text-start px-3">
                                Undergraduate Prerequisites:{" "}
                                {courseInfo.undergrad_prereqs}
                            </h5>
                        )}
                        {courseInfo.undergrad_coreqs && (
                            <h5 className="text-start px-3">
                                Undergraduate Corequisites:{" "}
                                {courseInfo.undergrad_coreqs}
                            </h5>
                        )}
                        {courseInfo.grad_prereqs && (
                            <h5 className="text-start px-3">
                                Graduate Prerequisites:{" "}
                                {courseInfo.grad_prereqs}
                            </h5>
                        )}
                        {courseInfo.grad_coreqs && (
                            <h5 className="text-start px-3">
                                Graduate Corequisites: {courseInfo.grad_coreqs}
                            </h5>
                        )}
                    </div>

                    <p className="p-3 text-start mx-auto">
                        {" "}
                        {courseInfo.description}
                    </p>

                    {courseReviews && courseReviews.length > 0 && (
                        <ReviewDisplay reviews={courseReviews} />
                    )}

                    <button
                        onClick={handleAddReviewButton}
                        className="m-4 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                    >
                        Add Review
                    </button>
                </>
            )}
        </div>
    );
};

export default Course;
