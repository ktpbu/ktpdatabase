import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DependencyMap = ({ subject }) => {
    console.log(subject);
    const subjectMap = {
        "computer-science": "Computer Science",
        "data-science": "Data Science",
        economics: "Economics",
        "mathematics-statistics": "Mathematics & Statistics",
    };
    return (
        <div className="text-start p-3">
            <Link
                to={"/academics/courses/dependencies/" + subject}
                className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
            >
                {subjectMap[subject]} Dependency Map
            </Link>
        </div>
    );
};

DependencyMap.propTypes = {
    subject: PropTypes.string.isRequired,
};

export default DependencyMap;
