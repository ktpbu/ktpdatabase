import { useState, useEffect } from "react";
import axios from "axios";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const backend = import.meta.env.VITE_BACKEND_URL;

const tableColumnHeaders = ["Chapter", "Institution", "Website"];

const OtherKTPChapters = () => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(
                    `${backend}/professional/resources/ktp-chapters`
                );
                console.log(response.data);
                setChapters(response.data["ktpChapters"]);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
        fetchChapters();
    }, []);
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start text-[#234c8b]">KTP Chapters</h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Professional", path: "/professional" },
                ]}
                current="KTP Chapters"
            />

            <div className="w-full overflow-x-scroll mx-auto">
                <table className="w-full mx-auto border-collapse">
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
                        {chapters &&
                            chapters.map((chapter, index) => (
                                <tr key={index}>
                                    <td className="w-fit p-2 text-start border-2 border-gray-200">
                                        {chapter.name}
                                    </td>
                                    <td className="w-fit p-2 text-start border-2 border-gray-200">
                                        {chapter.institution}
                                    </td>
                                    <td className="w-fit p-2 text-start border-2 border-gray-200">
                                        <a
                                            href={chapter.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#234c8b] hover:text-[#458eff]"
                                        >
                                            {chapter.url}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OtherKTPChapters;
