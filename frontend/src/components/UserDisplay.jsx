import PropTypes from "prop-types";

import DeleteUserModal from "./DeleteUserModal";

const UserDisplay = ({ users }) => {
    const tableColumnHeaders = [
        "Index",
        "First",
        "Last",
        "BU Email",
        "Class",
        "Admin",
    ];
    const tableColumnData = ["first", "last", "bu_email", "class", "is_admin"];
    return (
        <div>
            {users.length > 0 && (
                <div className="w-full overflow-x-scroll mx-auto">
                    <table className="w-full mx-auto">
                        <tr>
                            {tableColumnHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    className="w-fit p-2 text-start border-2 border-gray-200"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="w-fit p-2 text-center border-2 border-gray-200">
                                    {index + 1}
                                </td>
                                {tableColumnData.map((key, index) => (
                                    <td
                                        key={index}
                                        className={`w-fit p-2 ${
                                            key === "is_admin"
                                                ? "text-center"
                                                : "text-start"
                                        } border-2 border-gray-200`}
                                    >
                                        {key === "is_admin"
                                            ? user[key]
                                                ? "Yes"
                                                : "No"
                                            : user[key]}
                                    </td>
                                ))}
                                <td>
                                    <DeleteUserModal
                                        first={user.first}
                                        last={user.last}
                                        id={user._id}
                                    />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
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
