import { Breadcrumb } from "react-bootstrap";

const Graduate = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Graduate</h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item active>Graduate</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Graduate;
