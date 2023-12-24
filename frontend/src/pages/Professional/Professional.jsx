import { Breadcrumb } from "react-bootstrap";
import "./Professional.css";

const Professional = () => {
  	return (
		<div className="page-content mx-auto w-75">
			<h2 className="text-start p-3">Professional</h2>

			<Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Professional</Breadcrumb.Item>
            </Breadcrumb>
		</div>
  	);
};

export default Professional;
