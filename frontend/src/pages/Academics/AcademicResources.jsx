
import { Breadcrumb, ListGroup, ListGroupItem } from "react-bootstrap";

// style sheets
import "./AcademicResources.css";
import "./../page-content.css";

const AcademicResources = () => {
	return (
		<div className="page-content">

			<h2 className="p-3 text-start">Resource List</h2>

			<Breadcrumb className="p-3">
				<Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
				<Breadcrumb.Item href='/academics/'>Academics</Breadcrumb.Item>
				<Breadcrumb.Item active>Resources</Breadcrumb.Item>
			</Breadcrumb>

			<ListGroup>
				<ListGroupItem>item1</ListGroupItem>
				<ListGroupItem>item2</ListGroupItem>
				<ListGroupItem>item3</ListGroupItem>
			</ListGroup>

		</div>
	);
};

export default AcademicResources;
