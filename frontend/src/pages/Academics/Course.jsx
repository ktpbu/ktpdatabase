import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

// style sheets
import "./Course.css";
import "./../page-content.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const Course = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState(" ");

    // load information from backend using axios
    useEffect(() => {
        setLoading(true);
        axios
            // use .GET function at that backend location
            .get(`${backend}/academics/courses/${id}`)

            // load info from .GET function response
            .then((res) => {
                setCourseInfo(res.data);
                setLoading(false);
            })

            // error handling
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    // return HTML to be rendered by page
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

            <h2 className="text-start p-3">
                {id}: {courseInfo.name}
            </h2>

            {courseInfo.prereqs !== "" ? (
                <h5 className="text-start p-3">
                    Prerequisites: {courseInfo.prereqs}
                </h5>
            ) : (
                <h5 className="text-start p-3">No Prerequisites</h5>
            )}

            <p className="p-3 text-start mx-auto"> {courseInfo.content}</p>
        </div>
    );
};

export default Course;
