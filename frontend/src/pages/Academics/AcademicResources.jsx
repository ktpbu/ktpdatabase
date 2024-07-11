import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const backend = import.meta.env.VITE_BACKEND_URL;

const AcademicResources = () => {
    const [usefulLinks, setUsefulLinks] = useState([]);
    const [jointMajors, setJointMajors] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const [usefulLinks, jointMajors] = await Promise.all([
                    axios.get(`${backend}/academics/resources/useful-links`),
                    axios.get(`${backend}/academics/resources/joint-majors`),
                ]);
                console.log(usefulLinks.data);
                console.log(jointMajors.data);
                setUsefulLinks(usefulLinks.data["usefulLinks"]);
                setJointMajors(jointMajors.data["jointMajors"]);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
        fetchResources();
    }, []);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start">Resources</h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Academics", path: "/academics" },
                ]}
                current="Resources"
            />

            <h3>Useful Links</h3>
            <div className="flex flex-wrap justify-around">
                {usefulLinks.map((resource) => (
                    <div
                        key={resource.name}
                        className="w-48 m-4 p-2 flex flex-col text-start border-1 hover:border-black rounded-md duration-200"
                    >
                        <h5>{resource.name}</h5>
                        {resource.items.map((item) => (
                            <a
                                key={item.link}
                                className="mt-2 no-underline hover:underline"
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

            <hr className="p-3"></hr>

            <h3>Joint Majors</h3>
            <div className="flex flex-wrap justify-around">
                {jointMajors.map((major) => (
                    <Link
                        key={major.name}
                        to={major.link}
                        className="m-4 no-underline"
                    >
                        <Card className="w-48 flex flex-col text-start text-lg duration-200 hover:bg-purple-200 hover:scale-105">
                            <Card.Body className="m-auto h-32">
                                {major.name}
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AcademicResources;
