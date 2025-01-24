import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const professionalOptions = [
    {
        link: "/professional/ktp-chapters",
        image: <GroupIcon className="my-auto" />,
        header: "KTP Chapters",
        text: "Links to websites of other KTP chapters",
    },
    {
        link: "/professional/Internships",
        image: <WorkIcon className="my-auto" />,
        header: "Internships and New Grad",
        text: "Useful resources for getting internships",
    },
];

const Professional = () => {
    return (
        <div className="w-3/4 mx-auto pt-20">
            <h2 className="p-3 text-start text-[#234c8b]">Professional</h2>

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

export default Professional;
