import { Breadcrumb, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ktplogolandscape from "./../../assets/ktplogolandscape.png";
import { useEffect } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const professionalOptions = [
    {
        link: "/professional/other-ktp-chapters",
        image: ktplogolandscape,
        header: "KTP Chapters",
        text: "Links to websites of other KTP chapters",
    },
];

const Professional = () => {
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            await axios.get(`${backend}/auth/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/login-error");
        }
    };

    useEffect(() => {
        getUser();
    });
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Professional</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Professional</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mx-auto mb-20 flex flex-wrap justify-center">
                {professionalOptions.map((option) => (
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
