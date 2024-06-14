import { Breadcrumb } from "react-bootstrap";

const resourceLists = [
    {
        name: "General",
        items: [
            {
                link: "https://degree-advice.bu.edu/Dashboard/",
                text: "Degree Advice",
            },
            {
                link: "https://www.bu.edu/academics/policies/dual-degree-program/",
                text: "Dual Degree Info",
            },
            {
                link: "http://www.bu.edu/link/bin/uiscgi_studentlink.pl/1664932150?ModuleName=gpa_calc.pl",
                text: "Check GPA",
            },
            {
                link: "https://www.bu.edu/link/bin/uiscgi_studentlink.pl/1540496146?ModuleName=transcript_preview.pl",
                text: "Check Transcript",
            },
        ],
    },
    {
        name: "Computer Science",
        items: [
            {
                link: "https://www.bu.edu/cs/undergraduate/academic-programs/",
                text: "Program List",
            },
        ],
    },
    {
        name: "Data Science",
        items: [
            {
                link: "https://www.bu.edu/cds-faculty/files/2023/01/CDS-DS_01.17.23.pdf",
                text: "Planning Sheet (2023)",
            },
        ],
    },
    {
        name: "Engineering",
        items: [
            {
                link: "https://www.bu.edu/dbin/eng/ugrad/cst/final.php",
                text: "Course Sequencing Tool",
            },
            {
                link: "https://www.bu.edu/eng/academics/resources/undergraduate-student-resources/eng-undergraduate-degree-requirements/program-planning-sheets/",
                text: "Planning Sheets",
            },
        ],
    },
];

const AcademicResources = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start">Resources</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item style={{ textDecoration: "none" }} href="/">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Resources</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mt-8 p-3 flex flex-wrap justify-between">
                {resourceLists.map((resource) => (
                    <div
                        key={resource.name}
                        className="flex flex-col text-start"
                    >
                        <h5>{resource.name}</h5>
                        {resource.items.map((item) => (
                            <a
                                key={item.link}
                                className="no-underline"
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.text}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicResources;
