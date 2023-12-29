import { Link } from "react-router-dom";
import { Card, CardGroup, Breadcrumb, Row, Col} from "react-bootstrap";

// style sheets
import "./Academics.css";
import "./../page-content.css";

const Academics = () => {
	return (
		<div className="page-content mx-auto w-75">

			<h2 className="text-start p-3">Academics</h2>

			<Breadcrumb className="p-3">
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Academics</Breadcrumb.Item>
			</Breadcrumb>

			<div className="d-flex justify-content-around">
				<Card className="m-3 border-secondary customCard">
					<Link to='/academics/courses/' className="customLink">
						<Card.Header className="customCardText">
							<b>Courses</b>
						</Card.Header>
						<Card.Body>
							<Card.Text className="customCardText customBodyText">
								Information, Ratings, and Planning advice on STEM courses at BU
							</Card.Text>
						</Card.Body>
					</Link>
				</Card>
				<Card className="m-3 border-secondary customCard">
					<Link to='/academics/resources/' className="customLink">
						<Card.Header className="customCardText">
							<b>Resources</b>
						</Card.Header>
						<Card.Body>
							<Card.Text className="customCardText customBodyText">
								Links and Guides on course-planning at BU
							</Card.Text>
						</Card.Body>
					</Link>
				</Card>
				<Card className="m-3 border-secondary customCard">
					<Link to='/academics/graduate/' className="customLink">
						<Card.Header className="customCardText">
							<b>Graduate</b>
						</Card.Header>
						<Card.Body>
							<Card.Text className="customCardText customBodyText">
								Information and Courses at Graduate level.
							</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			</div>
		</div>
	);
};

export default Academics;
