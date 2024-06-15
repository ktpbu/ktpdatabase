import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import DependencyMap from "../../components/DependencyMap/DependencyMap";

const backend = import.meta.env.VITE_BACKEND_URL;

const CourseIcon = ({ id, name, college }) => {
    return (
        <Link
            className="w-20 mb-2.5 mx-2.5 py-1.5 text-black no-underline border-solid border-2 rounded-2xl hover:border-black duration-100 hover:scale-110 "
            title={name}
            to={`/academics/courses/${college}${id}`}
        >
            {id}
        </Link>
    );
};

const CourseListItem = ({ info }) => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setLoading(true);
        (info.year === "undergrad"
            ? axios.get(
                  `${backend}/academics/courses/undergrad/${info.subject}`
              )
            : axios.get(`${backend}/academics/courses/grad/${info.subject}`)
        )
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
                // console.log(courses);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h4 className="p-3 text-start">{info.name}</h4>
            <div className="p-3 flex flex-row flex-wrap justify-content-evenly">
                {Object.keys(courses).map((courseKey, index) => (
                    <CourseIcon
                        key={index}
                        id={courses[courseKey].id}
                        name={courses[courseKey].name}
                        college={info.college}
                    />
                ))}
            </div>
            <div className="bottom-course d-flex flex-row justify-content-between p-3">
                {info.map && <DependencyMap subject={info.subject} />}

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
            <hr className="p-3"></hr>
        </div>
    );
};

CourseIcon.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    college: PropTypes.string.isRequired,
};

CourseListItem.propTypes = {
    info: PropTypes.shape({
        college: PropTypes.string.isRequired,
        map: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
    }),
};

export default CourseListItem;
