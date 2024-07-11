import PropTypes from "prop-types";
import { Breadcrumb } from "react-bootstrap";

const CustomBreadcrumb = ({ previous, current }) => {
    return (
        <Breadcrumb className="p-3">
            {previous.map((page, index) => (
                <Breadcrumb.Item key={index} href={page.path}>
                    {page.title}
                </Breadcrumb.Item>
            ))}

            <Breadcrumb.Item active>{current}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

CustomBreadcrumb.propTypes = {
    previous: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
};

export default CustomBreadcrumb;
