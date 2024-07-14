import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

import undergrad from "./../../assets/undergrad.png";
import grad from "./../../assets/grad.png";
import resources from "./../../assets/resources.png";

const academicOptions = [
    {
        link: "/academics/courses/",
        image: undergrad,
        header: "Courses",
        text: "Insightful information, ratings, reviews, and planning advice for STEM courses at BU",
    },
    {
        link: "/academics/resources/",
        image: resources,
        header: "Resources",
        text: "Valuable academic resources for students at BU",
    },
    {
        link: "/academics/graduate/",
        image: grad,
        header: "Graduate",
        text: "Information for graduate courses at BU",
    },
];

const Academics = () => {
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h2 className=" p-3 text-start text-[#234c8b]">Academics</h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Academics"
            />

            <div className="mx-auto mb-20 flex flex-wrap justify-center">
                {academicOptions.map((option) => (
                    <Link
                        key={option.header}
                        to={option.link}
                        className="m-4 no-underline"
                    >
                        <Card className="w-72 sm:w-96 flex flex-col text-start text-lg duration-200 hover:bg-[#baecba] hover:scale-105">
                            <Card.Header>
                                <img
                                    className="w-auto h-8 mr-2.5"
                                    src={option.image}
                                />
                                <b>{option.header}</b>
                            </Card.Header>
                            <Card.Body className="h-32">
                                <Card.Text className="text-sm text-gray-500">
                                    {option.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Academics;
