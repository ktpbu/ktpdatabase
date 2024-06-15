import { Breadcrumb } from "react-bootstrap";

const Professional = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Professional</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Professional</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Professional;
