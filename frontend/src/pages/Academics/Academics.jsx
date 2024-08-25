import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MapIcon from "@mui/icons-material/Map";
import SchoolIcon from "@mui/icons-material/School";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const academicOptions = [
    {
        link: "/academics/courses/",
        image: <LibraryBooksIcon className="my-auto" />,
        header: "Courses",
        text: "Insightful information, ratings, reviews, and planning advice for STEM courses at BU",
    },
    {
        link: "/academics/resources/",
        image: <MapIcon className="my-auto" />,
        header: "Resources",
        text: "Valuable academic resources for students at BU",
    },
    {
        link: "/academics/graduate/",
        image: <SchoolIcon className="my-auto" />,
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
                        <Card className="w-72 sm:w-96 flex flex-col text-start text-lg duration-200 hover:bg-[#8bb9ff] hover:scale-105">
                            <Card.Header>
                                <div className="flex">
                                    {option.image}
                                    <b className="ml-3 my-auto">
                                        {option.header}
                                    </b>
                                </div>
                            </Card.Header>
                            <Card.Body className="h-32">
                                <Card.Text className="text-sm">
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
