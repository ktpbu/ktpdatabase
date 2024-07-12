import { useState } from "react";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const Internships = () => {
    const [internshipResources] = useState([
        {
            header: "Job Websites",
            resources: [
                { name: "LinkedIn", url: "https://www.linkedin.com/jobs/" },
                {
                    name: "BU On-Campus Research Opportunities",
                    url: "https://www.bu.edu/urop/opportunities/on-campus-research/",
                },
                { name: "BU Connects", url: "https://buconnects.com/" },
                {
                    name: "Handshake",
                    url: "https://app.joinhandshake.com/login",
                },
                { name: "Indeed", url: "https://www.indeed.com/" },
                { name: "Simplify", url: "https://simplify.jobs/" },
                { name: "RippleMatch", url: "https://ripplematch.com/" },
            ],
        },
        {
            header: "GitHub Repos",
            resources: [
                {
                    name: "Mission-Peace Repo",
                    url: "https://github.com/mission-peace/interview",
                },
                {
                    name: "Pitt CSC Internship Repo",
                    url: "https://github.com/SimplifyJobs/Summer2025-Internships",
                },
            ],
        },
        {
            header: "Blogs and Videos",
            resources: [
                {
                    name: "Mock Technical Interview",
                    url: "https://www.youtube.com/watch?v=1qw5ITr3k9E&t=86s",
                },
            ],
        },

        {
            header: "Interview Prep",
            resources: [
                { name: "LeetCode", url: "https://leetcode.com/" },
                { name: "DataLemur", url: "https://datalemur.com/" },
                {
                    name: "GeeksForGeeks",
                    url: "https://www.geeksforgeeks.org/",
                },
            ],
        },
    ]);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start text-[#234c8b]">Internships</h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Professional", path: "/professional" },
                ]}
                current="Internships"
            />

            <div className="flex flex-wrap justify-around p-3">
                {internshipResources.map((section, index) => (
                    <div
                        key={index}
                        className="w-64 m-4 p-2 flex flex-col text-start border-1 hover:border-[#234c8b] rounded-md duration-200"
                    >
                        <h5>{section.header}</h5>
                        {section.resources.map((item, index) => (
                            <a
                                key={index}
                                className="mt-2 text-[#234c8b] hover:text-[#458eff]"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Internships;
