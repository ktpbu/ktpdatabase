import { useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

const backend = import.meta.env.VITE_BACKEND_URL;

const Directory = () => {
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        try {
            await axios.get(`${backend}/auth/google/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

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
            <h2 className="text-start p-3">
                Kappa Theta Pi Lambda Chapter Directory
            </h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Directory</Breadcrumb.Item>
            </Breadcrumb>

            {members.length > 0 && (
                <table className="max-w-full mx-auto">
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
                </table>
            )}
        </div>
    );
};

export default Directory;
