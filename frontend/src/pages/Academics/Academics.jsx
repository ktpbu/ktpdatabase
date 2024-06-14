import { Link } from "react-router-dom";
import { Card, Breadcrumb } from "react-bootstrap";

import undergrad from "./../../assets/undergrad.png";
import grad from "./../../assets/grad.png";
import resources from "./../../assets/resources.png";

const academicOptions = [
    {
        link: "/academics/courses/",
        image: undergrad,
        header: "Courses",
        text: "Information, Ratings, and Planning advice on STEM courses at BU",
    },
    {
        link: "/academics/resources/",
        image: resources,
        header: "Resources",
        text: "Links and Guides on course-planning at BU",
    },
    {
        link: "/academics/graduate/",
        image: grad,
        header: "Graduate",
        text: "Information and Courses at Graduate level",
    },
];

const Academics = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Academics</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Academics</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mx-auto mb-20 flex flex-wrap justify-center">
                {academicOptions.map((option) => (
                    <Link
                        key={option.header}
                        to={option.link}
                        className="m-4 no-underline"
                    >
                        <Card className="w-96 flex flex-col text-start text-lg duration-200 hover:bg-purple-200 hover:scale-105">
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
