import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        <Link className="w-20 mb-2.5 mx-2.5 py-1.5 text-black no-underline border-1 border-solid border-black rounded-2xl duration-100 hover:scale-110 animate-pulse">
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

    const content = (
        <>
            <div className="flex flex-row flex-wrap justify-content-evenly">
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
            <div className="mt-3 flex md:flex-row-reverse justify-center md:justify-between">
                <p className="text-start">
                    <a
                        href={info.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        Complete List
                    </a>
                </p>
                {info.map && <DependencyMap subject={info.subject} />}
            </div>
        </>
    );

    return (
        <div>
            <div className="md:hidden my-8">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h4 className="mt-2 text-start text-[#234c8b]">
                            {info.name}
                        </h4>
                    </AccordionSummary>
                    <AccordionDetails>{content}</AccordionDetails>
                </Accordion>
            </div>
            <h4 className="hidden md:block p-3 text-start text-[#234c8b]">
                {info.name}
            </h4>
            <div className="hidden md:block">{content}</div>
            <hr className="hidden md:block p-3"></hr>
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
