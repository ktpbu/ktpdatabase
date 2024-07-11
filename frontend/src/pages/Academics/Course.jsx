import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import ReviewDisplay from "../../components/ReviewDisplay";

const backend = import.meta.env.VITE_BACKEND_URL;

const Course = () => {
    const navigate = useNavigate();

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
            const subject = subjectMap[id.slice(0, 5)];
            try {
                const [courseRes, reviewsRes] = await Promise.all([
                    axios.get(
                        `${backend}/academics/courses/${level}/${subject}/${id}`
                    ),
                    // not sure why the review request only works with post and not get
                    axios.post(`${backend}/academics/courses/reviews/${id}`),
                ]);
                setCourseInfo(courseRes.data[0]);
                setCourseReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchCourseData();
    }, [id, level, subjectMap]);

    const handleAddReviewButton = () => {
        navigate(`/academics/courses/${level}/${id}/add-review`);
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3 my-auto">
                {courseInfo.code}: {courseInfo.name}
            </h2>

            <div className="p-3 flex">
                <p className="mr-1">
                    <a
                        href={"/"}
                        className="text-[#458eff] hover:text-[#234c8b] duration-200 ease-linear"
                    >
                        Home
                    </a>
                    {" /"}
                </p>
                <p className="mr-1">
                    <a
                        href={"/academics"}
                        className="text-[#458eff] hover:text-[#234c8b] duration-200 ease-linear"
                    >
                        Academics
                    </a>
                    {" /"}
                </p>
                {level === "undergrad" ? (
                    <p className="mr-1">
                        <a
                            href={"/academics/courses"}
                            className="text-[#458eff] hover:text-[#234c8b] duration-200 ease-linear"
                        >
                            Courses
                        </a>
                        {" /"}
                    </p>
                ) : (
                    <p className="mr-1">
                        <a
                            href={"/academics/graduate"}
                            className="text-[#458eff] hover:text-[#234c8b] duration-200 ease-linear"
                        >
                            Graduate
                        </a>
                        {" /"}
                    </p>
                )}
                <p className="mr-1">{courseInfo.name}</p>
            </div>

            <h5 className="text-start p-3">
                {courseInfo.prereqs !== ""
                    ? courseInfo.prereqs
                    : "No Prerequisites"}
            </h5>

            <p className="p-3 text-start mx-auto"> {courseInfo.content}</p>

            {courseReviews && courseReviews.length > 0 && (
                <ReviewDisplay reviews={courseReviews} />
            )}

            <button
                onClick={handleAddReviewButton}
                className="m-4 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
            >
                Add Review
            </button>
        </div>
    );
};

export default Course;
