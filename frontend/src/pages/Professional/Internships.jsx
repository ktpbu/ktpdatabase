import { useState, useEffect } from "react";
import axios from "axios";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const backend = import.meta.env.VITE_BACKEND_URL;

const Internships = () => {
    const [internshipResources, setInternshipResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `${backend}/professional/resources/internship-resources`
                );
                console.log(response.data);
                setInternshipResources(response.data["internshipResources"]);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
        fetchResources();
    }, []);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start text-[#234c8b]">
                Internships and New Grad
            </h2>

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
                        className="w-64 m-4 p-2 flex flex-col text-start border-1 hover:border-[#234c8b] rounded-md duration-200 ease-linear bg-white"
                    >
                        <h5>{section.header}</h5>
                        {section.resources.map((resource, index) => (
                            <a
                                key={index}
                                className="w-fit mt-2 text-[#234c8b] hover:text-[#458eff]"
                                href={resource.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {resource.name}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Internships;
