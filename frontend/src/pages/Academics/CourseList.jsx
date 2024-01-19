import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

import DependencyMap from "../../components/DependencyMap/DependencyMap";

import "./CourseList.css";
import "./../page-content.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const CourseIcon = (prop) => {
    const { id, name, college } = prop;

    return (
        <Link
            className="icon"
            title={prop.name}
            to={`/academics/courses/${college}${id}`}
        >
            {id}
        </Link>
    );
};

const CourseList = () => {
    const [bmeCourses, setBmeCourses] = useState([]);
    const [csCourses, setCsCourses] = useState([]);
    const [dsCourses, setDsCourses] = useState([]);
    const [econCourses, setEconCourses] = useState([]);
    const [eceCourses, setEceCourses] = useState([]);
    const [engCoreCourses, setEngCoreCourses] = useState([]);
    const [mathCourses, setMathCourses] = useState([]);
    const [mecheCourses, setMecheCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const subjectMap = useMemo(
        () => ({
            "biomedical-eng": setBmeCourses,
            "computer-science": setCsCourses,
            "data-science": setDsCourses,
            economics: setEconCourses,
            "electrical-computer-eng": setEceCourses,
            "eng-core": setEngCoreCourses,
            "mathematics-statistics": setMathCourses,
            "mechanical-eng": setMecheCourses,
        }),
        []
    );

    useEffect(() => {
        setLoading(true);
        for (const subject in subjectMap) {
            axios
                .get(`${backend}/academics/courses/undergrad/${subject}`)
                .then((res) => {
                    subjectMap[subject](res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setLoading(false);
    }, [subjectMap]);

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

            <p>
                <b>NOTE</b>: if looking for graduate courses, check{" "}
                <Link to="/academics/graduate/">here</Link>
            </p>

            {/* computer science */}

            <hr className="p-3"></hr>

            <h4 className="text-start p-3">Computer Science</h4>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(csCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={csCourses[courseKey].id}
                        name={csCourses[courseKey].name}
                        college={"CAS"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-between p-3">
                <DependencyMap subject="computer-science" />
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/cas/courses/computer-science/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* data science */}

            <hr className="p-3"></hr>

            <h4 className="text-start p-3">Data Science</h4>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(dsCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={dsCourses[courseKey].id}
                        name={dsCourses[courseKey].name}
                        college={"CDS"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-between p-3">
                <DependencyMap subject="data-science" />
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/cds/courses/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* engineering */}

            <hr className="p-3"></hr>

            <h4 className="text-start p-3">Engineering</h4>

            {/* biomedical engineering */}

            <h5 className="text-start p-4">Biomedical Engineering</h5>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(bmeCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={bmeCourses[courseKey].id}
                        name={bmeCourses[courseKey].name}
                        college={"ENG"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-end p-3">
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/eng/courses/biomedical-engineering/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* electrical & computer engineering */}

            <h5 className="text-start p-4">
                Electrical & Computer Engineering
            </h5>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(eceCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={eceCourses[courseKey].id}
                        name={eceCourses[courseKey].name}
                        college={"ENG"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-end p-3">
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* engineering core */}

            <h5 className="text-start p-4">Engineering Core</h5>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(engCoreCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={engCoreCourses[courseKey].id}
                        name={engCoreCourses[courseKey].name}
                        college={"ENG"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-end p-3">
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/eng/courses/engineering-core/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* mechanical engineering */}

            <h5 className="text-start p-4">Mechanical Engineering</h5>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(mecheCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={mecheCourses[courseKey].id}
                        name={mecheCourses[courseKey].name}
                        college={"ENG"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-end p-3">
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/eng/courses/mechanical-engineering/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* economics */}

            <hr className="p-3"></hr>

            <h4 className="text-start p-3">Economics</h4>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(econCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={econCourses[courseKey].id}
                        name={econCourses[courseKey].name}
                        college={"CAS"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-between p-3">
                <DependencyMap subject="economics" />
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/cas/courses/economics/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* mathematics & statistics */}

            <hr className="p-3"></hr>

            <h4 className="text-start p-3">Mathematics & Statistics</h4>
            <div className="d-flex flex-row flex-wrap courseiconlist justify-content-evenly p-3">
                {Object.keys(mathCourses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={mathCourses[courseKey].id}
                        name={mathCourses[courseKey].name}
                        college={"CAS"}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-between p-3">
                <DependencyMap subject="mathematics-statistics" />
                <p className="text-start p-3">
                    {" "}
                    <a
                        href="https://www.bu.edu/academics/cas/courses/mathematics-statistics/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Complete List
                    </a>{" "}
                </p>
            </div>

            {/* ######################
            HUB BELOW
            ######################### */}

            <hr className="p-3"></hr>
        </div>
    );
};

export default CourseList;
