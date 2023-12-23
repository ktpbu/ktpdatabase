import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import "./Course.css";

const Course = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState(" ");

    // set backend server URL based on params on frontend URL
    let url = "http://localhost:3000/academics/courses/" + id;

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
        <div className="page-content">
            <h3 className="course-title">{id} : {courseInfo.name}</h3> 
            <p className="course-text"> {courseInfo.content}</p>
        </div>
    );
};

export default Course;