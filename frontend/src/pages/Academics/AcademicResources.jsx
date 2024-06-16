import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const AcademicResources = () => {
    const [resourceLists, setResourceLists] = useState([]);

    useEffect(() => {
        axios
            .get(`${backend}/academics/resources/useful-links`)
            .then((res) => {
                console.log(res.data.usefulLinks);
                setResourceLists(res.data.usefulLinks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

            <h3>Useful Links</h3>

            <div className="p-3 flex flex-wrap justify-around">
                {resourceLists.map((resource) => (
                    <div
                        key={resource.name}
                        className="w-48 m-4 p-2 flex flex-col text-start border-1 hover:border-black rounded-md duration-200"
                    >
                        <h5>{resource.name}</h5>
                        {resource.items.map((item) => (
                            <a
                                key={item.link}
                                className="no-underline hover:underline"
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
