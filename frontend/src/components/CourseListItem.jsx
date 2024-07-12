import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import DependencyMap from "./DependencyMap";

const backend = import.meta.env.VITE_BACKEND_URL;

const CourseIcon = ({ code, level, college }) => {
    return (
        <Link
            className="w-20 mb-2.5 mx-2.5 py-1.5 text-black no-underline border-1 border-solid border-black rounded-2xl duration-100 hover:scale-110 "
            title={code}
            to={`/academics/courses/${level}/${college}${code}`}
        >
            {code}
        </Link>
    );
};

const SkeletonCourseIcon = () => {
    return (
        <Link className="w-20 mb-2.5 mx-2.5 py-1.5 text-black no-underline border-1 border-solid border-black rounded-2xl duration-100 hover:scale-110 ">
            <span className="invisible">loader</span>
        </Link>
    );
};

const CourseListItem = ({ info }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            await axios
                .get(
                    `${backend}/academics/courses/${info.level}/${info.subject}`
                )
                .then((res) => {
                    setCourses(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };
        fetchCourses();
    }, [info.level, info.subject]);

    return (
        <div>
            <h4 className="p-3 text-start text-[#234c8b]">{info.name}</h4>
            <div className="p-3 flex flex-row flex-wrap justify-content-evenly">
                {loading
                    ? Array.from({ length: 20 }).map((_, index) => (
                          <SkeletonCourseIcon key={index} />
                      ))
                    : courses.map((course, index) => (
                          <CourseIcon
                              key={index}
                              code={course.code}
                              level={info.level}
                              college={info.college}
                          />
                      ))}
            </div>
            <div className="flex flex-row-reverse justify-content-between p-3">
                <p className="text-start p-3">
                    {" "}
                    <a
                        href={info.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        Complete List
                    </a>{" "}
                </p>
                {info.map && <DependencyMap subject={info.subject} />}
            </div>
            <hr className="p-3"></hr>
        </div>
    );
};

CourseIcon.propTypes = {
    code: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    college: PropTypes.string.isRequired,
};

CourseListItem.propTypes = {
    info: PropTypes.shape({
        college: PropTypes.string.isRequired,
        map: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
    }),
};

export default CourseListItem;
