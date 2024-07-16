import { Link } from "react-router-dom";

import CourseListItem from "../../components/CourseListItem";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const undergradSubjectInfo = {
    "biomedical-eng-ug": {
        college: "ENG",
        map: false,
        name: "Biomedical Engineering",
        subject: "biomedical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
        level: "undergrad",
    },
    "computer-science-ug": {
        college: "CAS",
        map: true,
        name: "Computer Science",
        subject: "computer-science",
        website: "https://www.bu.edu/academics/cas/courses/computer-science/",
        level: "undergrad",
    },
    "data-science-ug": {
        college: "CDS",
        map: true,
        name: "Data Science",
        subject: "data-science",
        website: "https://www.bu.edu/academics/cds/courses/",
        level: "undergrad",
    },
    "economics-ug": {
        college: "CAS",
        map: false,
        name: "Economics",
        subject: "economics",
        website: "https://www.bu.edu/academics/cas/courses/economics/",
        level: "undergrad",
    },
    "electrical-computer-eng-ug": {
        college: "ENG",
        map: false,
        name: "Electrical & Computer Engineering",
        subject: "electrical-computer-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
        level: "undergrad",
    },
    "eng-core-ug": {
        college: "ENG",
        map: false,
        name: "Engineering Core",
        subject: "eng-core",
        website: "https://www.bu.edu/academics/eng/courses/engineering-core/",
        level: "undergrad",
    },
    "mathematics-statistics-ug": {
        college: "CAS",
        map: true,
        name: "Mathematics & Statistics",
        subject: "mathematics-statistics",
        website:
            "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
        level: "undergrad",
    },
    "mechanical-eng-ug": {
        college: "ENG",
        map: false,
        name: "Mechanical Engineering",
        subject: "mechanical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
        level: "undergrad",
    },
};

const CourseList = () => {
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h2 className="p-3 text-start text-[#234c8b]">Courses</h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Academics", path: "/academics" },
                ]}
                current="Courses"
            />

            <p className="text-start p-3">
                KTP brothers span many different majors, across several
                departments and colleges. The main focuses are on Computer
                Science, Data Science, and Engineering. Click on an icon to
                learn about that particular course.
            </p>

            <p>
                <b>NOTE</b>: click{" "}
                <Link
                    to="/academics/graduate/"
                    className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                >
                    here
                </Link>{" "}
                for graduate courses
            </p>

            <CourseListItem
                info={undergradSubjectInfo["computer-science-ug"]}
            />
            <CourseListItem info={undergradSubjectInfo["data-science-ug"]} />

            <CourseListItem info={undergradSubjectInfo["economics-ug"]} />

            <CourseListItem info={undergradSubjectInfo["biomedical-eng-ug"]} />

            <CourseListItem
                info={undergradSubjectInfo["electrical-computer-eng-ug"]}
            />

            <CourseListItem info={undergradSubjectInfo["eng-core-ug"]} />

            <CourseListItem info={undergradSubjectInfo["mechanical-eng-ug"]} />

            <CourseListItem
                info={undergradSubjectInfo["mathematics-statistics-ug"]}
            />
        </div>
    );
};

export default CourseList;
