import { useEffect, useState } from "react";
import axios from "axios";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const backend = import.meta.env.VITE_BACKEND_URL;

const Directory = () => {
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        try {
            const membersResponse = await axios.get(
                `${backend}/account/directory/get-members`
            );
            setMembers(membersResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMembers();
    }, []);

    const tableColumnHeaders = [
        "Name",
        "Major",
        "Minor",
        "College",
        "Grad",
        "Email",
        "Phone",
    ];
    const tableColumnData = [
        "Name",
        "Major",
        "Minor",
        "Colleges",
        "GradYear",
        "BUEmail",
        "PhoneNumber",
    ];

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start text-[#234c8b]">
                Kappa Theta Pi Lambda Chapter Directory
            </h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Directory"
            />

            {members.length > 0 && (
                <div className="w-full overflow-x-scroll mx-auto">
                    <table className="w-full mx-auto">
                        <thead>
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
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index}>
                                    {tableColumnData.map((key, index) => (
                                        <td
                                            key={index}
                                            className="w-fit p-2 text-start border-2 border-gray-200"
                                        >
                                            {key === "Name"
                                                ? `${member.FirstName} ${member.LastName}`
                                                : member[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Directory;
