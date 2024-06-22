import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import axios from "axios";

import CourseListItem from "../../components/CourseListItem/CourseListItem";

const backend = import.meta.env.VITE_BACKEND_URL;

const gradSubjectInfo = {
    "biomedical-eng-g": {
        college: "ENG",
        map: false,
        name: "Biomedical Engineering",
        subject: "biomedical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
        level: "grad",
    },
    "computer-science-g": {
        college: "CAS",
        map: false,
        name: "Computer Science",
        subject: "computer-science",
        website: "https://www.bu.edu/academics/cas/courses/computer-science/",
        level: "grad",
    },
    "data-science-g": {
        college: "CDS",
        map: false,
        name: "Data Science",
        subject: "data-science",
        website: "https://www.bu.edu/academics/cds/courses/",
        level: "grad",
    },
    "economics-g": {
        college: "CAS",
        map: false,
        name: "Economics",
        subject: "economics",
        website: "https://www.bu.edu/academics/cas/courses/economics/",
        level: "grad",
    },
    "electrical-computer-eng-g": {
        college: "ENG",
        map: false,
        name: "Electrical & Computer Engineering",
        subject: "electrical-computer-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
        level: "grad",
    },
    "eng-core-g": {
        college: "ENG",
        map: false,
        name: "Engineering Core",
        subject: "eng-core",
        website: "https://www.bu.edu/academics/eng/courses/engineering-core/",
        level: "grad",
    },
    "mathematics-statistics-g": {
        college: "CAS",
        map: false,
        name: "Mathematics & Statistics",
        subject: "mathematics-statistics",
        website:
            "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
        level: "grad",
    },
    "mechanical-eng-g": {
        college: "ENG",
        map: false,
        name: "Mechanical Engineering",
        subject: "mechanical-eng",
        website:
            "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
        level: "grad",
    },
};

const Graduate = () => {
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        try {
            await axios.get(`${backend}/auth/google/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Graduate</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Graduate</Breadcrumb.Item>
            </Breadcrumb>

            <CourseListItem info={gradSubjectInfo["computer-science-g"]} />
            <CourseListItem info={gradSubjectInfo["data-science-g"]} />

            <h4 className="text-start p-3">Engineering</h4>
            <CourseListItem info={gradSubjectInfo["biomedical-eng-g"]} />
            <CourseListItem
                info={gradSubjectInfo["electrical-computer-eng-g"]}
            />
            <CourseListItem info={gradSubjectInfo["eng-core-g"]} />
            <CourseListItem info={gradSubjectInfo["mechanical-eng-g"]} />

            <CourseListItem info={gradSubjectInfo["economics-g"]} />
            <CourseListItem
                info={gradSubjectInfo["mathematics-statistics-g"]}
            />
        </div>
    );
};

export default Graduate;
