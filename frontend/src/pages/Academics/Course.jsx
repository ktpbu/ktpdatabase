import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import "./Course.css";
import { Breadcrumb } from "react-bootstrap";

const Course = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState(" ");

    // set backend server URL based on params on frontend URL
    let baseURL = "http://localhost:3000/academics/courses/";
    let url = baseURL + id;

    // load information from backend using axios
    useEffect(() => {
        setLoading(true);
        axios
            // use .GET function at that backend location
            .get(url)
            
            // load info from .GET function response
            .then((res) => {
                setCourseInfo(res.data);
                setLoading(false);
            })

            // error handling
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    
    // return HTML to be rendered by page
    return (
        <div className="page-content mx-auto w-75">
            <h2 className="text-start p-3">{id} : {courseInfo.name}</h2> 

            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">Courses</Breadcrumb.Item>
                <Breadcrumb.Item active>{courseInfo.name}</Breadcrumb.Item>
            </Breadcrumb>

            <p className="p-3 text-start mx-auto"> {courseInfo.content}</p>
        </div>
    );
};

export default Course;