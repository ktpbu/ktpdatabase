import { Breadcrumb } from "react-bootstrap";

// style sheets
import "./AcademicResources.css";
import "./../page-content.css";

const AcademicResources = () => {
    return (
        <div className="page-content">
            <h2 className="p-3 text-start">Resource List</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Resources</Breadcrumb.Item>
            </Breadcrumb>

            <div className="p-3 listContainer">
                <div className="res-list">
                    <h5>General</h5>
                    <ul>
                        <li>
                            <a
                                href="https://degree-advice.bu.edu/Dashboard/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Degree Advice
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.bu.edu/academics/policies/dual-degree-program/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Dual Degree Info
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www.bu.edu/link/bin/uiscgi_studentlink.pl/1664932150?ModuleName=gpa_calc.pl"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Check GPA
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.bu.edu/link/bin/uiscgi_studentlink.pl/1540496146?ModuleName=transcript_preview.pl"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Check Transcript
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="res-list">
                    <h5>Computer Science</h5>
                    <ul>
                        <li>
                            <a
                                href="https://www.bu.edu/cs/undergraduate/academic-programs/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Program List
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="res-list">
                    <h5>Data Science</h5>
                    <ul>
                        <li>
                            <a
                                href="https://www.bu.edu/cds-faculty/files/2023/01/CDS-DS_01.17.23.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Planning Sheet (2023)
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="res-list">
                    <h5>Engineering</h5>
                    <ul>
                        <li>
                            <a
                                href="https://www.bu.edu/dbin/eng/ugrad/cst/final.php"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Course Sequencing Tool
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.bu.edu/eng/academics/resources/undergraduate-student-resources/eng-undergraduate-degree-requirements/program-planning-sheets/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Planning Sheets
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AcademicResources;
