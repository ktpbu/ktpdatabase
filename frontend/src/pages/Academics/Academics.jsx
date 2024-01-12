import { Link } from "react-router-dom";
import { Card, Breadcrumb } from "react-bootstrap";

// style sheets
import "./Academics.css";
import "./../page-content.css";

import undergrad from "./../../assets/undergrad.png";
import grad from "./../../assets/grad.png";
import resources from "./../../assets/resources.png";

const Academics = () => {
    return (
        <div className="page-content mx-auto w-75">
            <h2 className="text-start p-3">Academics</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Academics</Breadcrumb.Item>
            </Breadcrumb>

            <div className="d-flex flex-wrap justify-content-center cardList">
                <Link to="/academics/courses/" className="customLink">
                    <Card className="border-secondary customCard">
                        <Card.Header className="customCardText">
                            <img className="acad-icon" src={undergrad} />
                            <b>Courses</b>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="customCardText customBodyText">
                                Information, Ratings, and Planning advice on
                                STEM courses at BU
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>

                <Link to="/academics/resources/" className="customLink">
                    <Card className="border-secondary customCard">
                        <Card.Header className="customCardText">
                            <img className="acad-icon" src={resources} />
                            <b>Resources</b>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="customCardText customBodyText">
                                Links and Guides on course-planning at BU
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>

                <Link to="/academics/graduate/" className="customLink">
                    <Card className="border-secondary customCard">
                        <Card.Header className="customCardText">
                            <img className="acad-icon" src={grad} />
                            <b>Graduate</b>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="customCardText customBodyText">
                                Information and Courses at Graduate level.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default Academics;
