import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const UserDisplay = ({ users }) => {
    console.log(users);
    return (
        <div>
            <div className="w-144 max-w-full h-96 overflow-y-scroll mx-auto mt-4 flex flex-col justify-around border-2 border-black">
                {users.map((user, index) => (
                    <Card
                        key={index}
                        className={`w-112 h-fit mx-auto mt-4 ${
                            index === users.length - 1 && "mb-4"
                        } flex flex-col flex-around border-1 border-gray-200 rounded-md bg-purple-100`}
                    >
                        <Card.Header>
                            <div className="w-96 mx-2 flex justify-between">
                                <p className="my-auto text-xl font-semibold text-right">
                                    {`${user.first} ${user.last}`}
                                </p>
                            </div>
                        </Card.Header>
                        <Card.Body className="my-auto bg-purple-100">
                            <div className="w-96 mx-2 flex flex-wrap justify-between text-xl">
                                <Card.Text>
                                    Email:{" "}
                                    <span className="text-2xl font-semibold">
                                        {user.bu_email}
                                    </span>
                                </Card.Text>
                                <Card.Text>
                                    Class:{" "}
                                    <span className="text-2xl font-semibold">
                                        {user.class}
                                    </span>
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

UserDisplay.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
            bu_email: PropTypes.string.isRequired,
            is_admin: PropTypes.bool.isRequired,
        })
    ),
};

export default UserDisplay;
