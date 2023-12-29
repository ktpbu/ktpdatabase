
import { Breadcrumb } from "react-bootstrap";

const Graduate = () => {
    return (
        <div className="page-content">
			<h2 className="text-start p-3">Professional</h2>

			<Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Graduate</Breadcrumb.Item>
            </Breadcrumb>
		</div>
    );
};


export default Graduate;