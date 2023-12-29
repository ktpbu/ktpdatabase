import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

// style sheets
import "./CourseList.css";
import "./../page-content.css";

const CourseIcon = (prop) => {
    const { id, name, college } = prop;

    return (
        <Link
            className="icon"
            title={prop.name}
            to={"/academics/courses/" + college + id}
        >
            {id}
        </Link>
    );
};

const DependencyMap = (prop) => {
    const { subject } = prop;
    return (
        <div className="text-start p-3">
            <Link to={"/academics/courses/dependencies/" + subject}>
                Course Dependency Map
            </Link>
        </div>
    );
};

const CourseList = () => {
    const [COURSELIST, setCList] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/academics/courses")
            .then((res) => {
                setCList(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // seperate courses by college/dept
    var ENG_COURSES = [];
    var CS_COURSES = [];
    var DS_COURSES = [];
    var HUB_COURSES = [];

    for (const key in COURSELIST) {
        if (key.slice(0, 3) == "ENG") {
            ENG_COURSES.push(COURSELIST[key]);
        } else if (key.slice(0, 3) == "CDS") {
            DS_COURSES.push(COURSELIST[key]);
        } else {
            if (key.slice(3, 5) == "CS") {
                CS_COURSES.push(COURSELIST[key]);
            } else {
                HUB_COURSES.push(COURSELIST[key]);
            }
        }
    }

    return (
        <div className="page-content">
            <h2 className="text-start p-3">Courses</h2>
            <Breadcrumb className="p-3 customBreadcrumb">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Courses</Breadcrumb.Item>
            </Breadcrumb>

            <p className="text-start p-3">
                KTP brothers span many different majors, across several
                departments and colleges. The main focuses are on Computer
                Science, Data Science, and Engineering. Click on an icon to
                learn about that particular course.
            </p>

            <p><b>NOTE</b>: if looking for graduate courses, check <Link href="/academics/graduate/">here</Link></p>

            <h4 className="text-start p-3">Computer Science</h4>
            <DependencyMap subject="cs" />
            <div className="d-flex flex-row flex-wrap p-3 courseiconlist">
                {CS_COURSES.map((course_obj, index) => (
                    <CourseIcon
                        key={index}
                        id={course_obj.id}
                        name={course_obj.name}
                        college={"CAS"}
                    />
                ))}
            </div>
            <p className="text-start p-3">
                Click{" "}
                <a
                    href="https://www.bu.edu/academics/cas/courses/computer-science/"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>{" "}
                for a complete list of computer science courses.
            </p>

            <h4 className="text-start p-3">Data Science</h4>
            <div className="d-flex flex-row flex-wrap p-3 courseiconlist">
                {DS_COURSES.map((course_obj, index) => (
                    <CourseIcon
                        key={index}
                        id={course_obj.id}
                        name={course_obj.name}
                        college={"CDS"}
                    />
                ))}
            </div>
            <p className="text-start p-3">
                Click{" "}
                <a
                    href="https://www.bu.edu/academics/cds/courses/"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>{" "}
                for a complete list of data science courses.
            </p>

            <h4 className="text-start p-3">Engineering</h4>
            <div className="d-flex flex-row flex-wrap p-3 courseiconlist">
                {ENG_COURSES.map((course_obj, index) => (
                    <CourseIcon
                        key={index}
                        id={course_obj.id}
                        name={course_obj.name}
                        college={"ENG"}
                    />
                ))}
            </div>
            <p className="text-start p-3">
                Click{" "}
                <a
                    href="https://www.bu.edu/academics/eng/courses/"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>{" "}
                for a complete list of engineering courses.
            </p>

            <h4 className="text-start p-3">Hub - Other Majors and Misc.</h4>
            <div className="d-flex flex-row flex-wrap p-3 courseiconlist">
                {HUB_COURSES.map((course_obj, index) => (
                    <CourseIcon
                        key={index}
                        id={course_obj.id}
                        name={course_obj.name}
                        college={course_obj.college}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
