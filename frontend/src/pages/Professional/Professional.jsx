import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

import ktplogolandscape from "./../../assets/ktplogolandscape.png";
import internship from "./../../assets/intern.png";

const professionalOptions = [
    {
        link: "/professional/other-ktp-chapters",
        image: ktplogolandscape,
        header: "KTP Chapters",
        text: "Links to websites of other KTP chapters",
    },
    {
        link: "/professional/Internships",
        image: internship,
        header: "Internships",
        text: "Useful resources for getting internships",
    },
];

const Professional = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Professional</h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Professional"
            />

            <div className="mx-auto mb-20 flex flex-wrap justify-center">
                {professionalOptions.map((option) => (
                    <Link
                        key={option.header}
                        to={option.link}
                        className="m-4 no-underline"
                    >
                        <Card className="w-96 flex flex-col text-start text-lg duration-200 hover:bg-[#baecba] hover:scale-105">
                            <Card.Header>
                                <img
                                    className="w-auto h-8 mr-2.5"
                                    src={option.image}
                                    alt={option.header}
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

export default Professional;
