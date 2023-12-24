import { Link } from "react-router-dom";
import { Card, CardGroup, Breadcrumb} from "react-bootstrap";
import "./Academics.css";

const Academics = () => {
	return (
		<div className="page-content mx-auto w-75 academics">

			<h2 className="text-start p-3">Academics</h2>

			<Breadcrumb className="p-3">
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Academics</Breadcrumb.Item>
			</Breadcrumb>

			<CardGroup>
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
			</CardGroup>

		</div>
	);
};

export default Academics;
