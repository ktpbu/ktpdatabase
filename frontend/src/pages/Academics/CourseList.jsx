import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import CourseListItem from "../../components/CourseListItem/CourseListItem";

import "./CourseList.css";
import "./../page-content.css";

const subjectInfo = {
    "biomedical-eng-ug": {
        college: "ENG",
        map: false,
        name: "Biomedical Engineering",
        subject: "biomedical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
        year: "undergrad",
    },
    "computer-science-ug": {
        college: "CAS",
        map: true,
        name: "Computer Science",
        subject: "computer-science",
        website: "https://www.bu.edu/academics/cas/courses/computer-science/",
        year: "undergrad",
    },
    "data-science-ug": {
        college: "CDS",
        map: true,
        name: "Data Science",
        subject: "data-science",
        website: "https://www.bu.edu/academics/cds/courses/",
        year: "undergrad",
    },
    "economics-ug": {
        college: "CAS",
        map: false,
        name: "Economics",
        subject: "economics",
        website: "https://www.bu.edu/academics/cas/courses/economics/",
        year: "undergrad",
    },
    "electrical-computer-eng-ug": {
        college: "ENG",
        map: false,
        name: "Electrical & Computer Engineering",
        subject: "electrical-computer-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
        year: "undergrad",
    },
    "eng-core-ug": {
        college: "ENG",
        map: false,
        name: "Engineering Core",
        subject: "eng-core",
        website: "https://www.bu.edu/academics/eng/courses/engineering-core/",
        year: "undergrad",
    },
    "mathematics-statistics-ug": {
        college: "CAS",
        map: true,
        name: "Mathematics & Statistics",
        subject: "mathematics-statistics",
        website:
            "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
        year: "undergrad",
    },
    "mechanical-eng-ug": {
        college: "ENG",
        map: false,
        name: "Mechanical Engineering",
        subject: "mechanical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
        year: "undergrad",
    },
    "biomedical-eng-g": {
        college: "ENG",
        map: false,
        name: "Biomedical Engineering",
        subject: "biomedical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
        year: "grad",
    },
    "computer-science-g": {
        college: "CAS",
        map: false,
        name: "Computer Science",
        subject: "computer-science",
        website: "https://www.bu.edu/academics/cas/courses/computer-science/",
        year: "grad",
    },
    "data-science-g": {
        college: "CDS",
        map: false,
        name: "Data Science",
        subject: "data-science",
        website: "https://www.bu.edu/academics/cds/courses/",
        year: "grad",
    },
    "economics-g": {
        college: "CAS",
        map: false,
        name: "Economics",
        subject: "economics",
        website: "https://www.bu.edu/academics/cas/courses/economics/",
        year: "grad",
    },
    "electrical-computer-eng-g": {
        college: "ENG",
        map: false,
        name: "Electrical & Computer Engineering",
        subject: "electrical-computer-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
        year: "grad",
    },
    "eng-core-g": {
        college: "ENG",
        map: false,
        name: "Engineering Core",
        subject: "eng-core",
        website: "https://www.bu.edu/academics/eng/courses/engineering-core/",
        year: "grad",
    },
    "mathematics-statistics-g": {
        college: "CAS",
        map: false,
        name: "Mathematics & Statistics",
        subject: "mathematics-statistics",
        website:
            "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
        year: "grad",
    },
    "mechanical-eng-g": {
        college: "ENG",
        map: false,
        name: "Mechanical Engineering",
        subject: "mechanical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
        year: "grad",
    },
};

const CourseList = () => {
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

            <CourseListItem info={subjectInfo["computer-science-ug"]} />
            <CourseListItem info={subjectInfo["data-science-ug"]} />

            <h4 className="text-start p-3">Engineering</h4>
            <CourseListItem info={subjectInfo["biomedical-eng-ug"]} />
            <CourseListItem info={subjectInfo["electrical-computer-eng-ug"]} />
            <CourseListItem info={subjectInfo["eng-core-ug"]} />
            <CourseListItem info={subjectInfo["mechanical-eng-ug"]} />

            <CourseListItem info={subjectInfo["economics-ug"]} />
            <CourseListItem info={subjectInfo["mathematics-statistics-ug"]} />
        </div>
    );
};

export default CourseList;
