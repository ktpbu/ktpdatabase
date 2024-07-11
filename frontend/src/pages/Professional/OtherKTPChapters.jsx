import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const OtherKTPChapters = () => {
    const ktpChapters = [
        {
            name: "Alpha",
            institution: "University of Michigan",
            url: "https://ktpmichigan.com/",
        },
        {
            name: "Beta",
            institution: "University of Pittsburgh",
            url: "https://www.instagram.com/ktp_pitt/",
        },
        {
            name: "Gamma",
            institution: "Rose–Hulman Institute of Technology",
            url: "https://www.facebook.com/profile.php?id=100079908335826",
        },
        {
            name: "Delta",
            institution: "Syracuse University",
            url: "https://www.ktpcuse.com/",
        },
        {
            name: "Epsilon",
            institution: "University of Maryland",
            url: "https://ktpumd.com/",
        },
        {
            name: "Zeta",
            institution: "The College of New Jersey",
            url: "https://tcnjktp.com/",
        },
        {
            name: "Eta",
            institution: "University of North Carolina at Chapel Hill",
            url: "https://ktp.cs.unc.edu/",
        },
        {
            name: "Theta",
            institution: "University of Chicago",
            url: "https://uchicagoktp.com/",
        },
        {
            name: "Iota",
            institution: "University of Texas at Austin",
            url: "https://www.instagram.com/texasktp/",
        },
        {
            name: "Kappa",
            institution: "Northwestern University",
            url: "https://www.ktpnu.com/",
        },
        {
            name: "Lambda",
            institution: "Boston University",
            url: "https://ktpbostonu.com/",
        },
        {
            name: "Mu",
            institution: "University of Texas at Dallas",
            url: "https://www.instagram.com/utdktp/",
        },
        {
            name: "Nu",
            institution: "University of Colorado Boulder",
            url: "https://www.ktpboulder.com/",
        },
        {
            name: "Rho",
            institution: "Vanderbilt University",
            url: "https://www.linkedin.com/company/kappa-theta-pi-rho/",
        },
        {
            name: "Sigma",
            institution: "University of Miami",
            url: "https://www.ktpmiami.com/",
        },
        {
            name: "Tau",
            institution: "University of Southern California",
            url: "https://www.instagram.com/ktp.usc/",
        },
    ];

    const tableColumnHeaders = ["Chapter", "Institution", "Website"];

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">KTP Chapters</h2>

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
                        {ktpChapters.map((chapter, index) => (
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
                                        className="text-[#458eff] hover:text-[#234c8b]"
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
