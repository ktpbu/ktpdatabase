import { Breadcrumb } from "react-bootstrap";

// style sheets
import "./Professional.css";
import "./../page-content.css";

const Professional = () => {
  	return (
		<div className="page-content">
			<h2 className="text-start p-3">Professional</h2>

			<Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Professional</Breadcrumb.Item>
            </Breadcrumb>
		</div>
  	);
};

export default Professional;
