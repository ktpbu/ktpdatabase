import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";

import "./Course.css";
import "./../page-content.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const Course = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const subject = subjectMap[id.slice(0, 5)];
        axios
            .get(`${backend}/academics/courses/undergrad/${subject}/${id}`)
            .then((res) => {
                setCourseInfo(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setLoading(true);
        axios
            .get(`${backend}/academics/courses/reviews/${id}`)
            .then((res) => {
                setCourseReviews(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [subjectMap, id]);

    const navigate = useNavigate();
    const handleAddReviewButton = () => {
        navigate(`/academics/courses/${id}/add-review`);
    };

    return (
        <div className="page-content">
            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{courseInfo.name}</Breadcrumb.Item>
            </Breadcrumb>

            <h2 className="text-start p-3 my-auto">
                {id}: {courseInfo.name}
            </h2>

            {courseInfo.prereqs !== "" ? (
                <h5 className="text-start p-3">{courseInfo.prereqs}</h5>
            ) : (
                <h5 className="text-start p-3">No Prerequisites</h5>
            )}

            <p className="p-3 text-start mx-auto"> {courseInfo.content}</p>

            <ReviewDisplay reviews={courseReviews} />

            <button
                onClick={handleAddReviewButton}
                className="course-add-review-button"
            >
                Add Review
            </button>
        </div>
    );
};

export default Course;
