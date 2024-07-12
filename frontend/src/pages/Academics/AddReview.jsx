import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Select from "react-select";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import CustomCheckbox from "../../components/CustomCheckbox";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddReview = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                return;
            }
            setUser(null);
        });
        return () => unsubscribe();
    }, []);

    const { level, id } = useParams();
    const [professors, setProfessors] = useState([]);
    const [professor, setProfessor] = useState({ value: "", label: "" });
    const values = [
        { value: 5, label: "5" },
        { value: 4, label: "4" },
        { value: 3, label: "3" },
        { value: 2, label: "2" },
        { value: 1, label: "1" },
    ];
    const [usefulness, setUsefulness] = useState({ value: "", label: "" });
    const [difficulty, setDifficulty] = useState({ value: "", label: "" });
    const [rating, setRating] = useState({ value: "", label: "" });
    const [anon, setAnon] = useState(false);

    const selectDropdowns = [
        {
            label: "Professor*",
            options: professors,
            value: professor,
            update: setProfessor,
            searchable: true,
        },
        {
            label: "Usefulness*",
            options: values,
            value: usefulness,
            update: setUsefulness,
            searchable: false,
        },
        {
            label: "Difficulty*",
            options: values,
            value: difficulty,
            update: setDifficulty,
            searchable: false,
        },
        {
            label: "Rating*",
            options: values,
            value: rating,
            update: setRating,
            searchable: false,
        },
    ];

    const [review, setReview] = useState("");

    const subjectMap = useMemo(
        () => ({
            ENGBE: "biomedical-eng",
            CASCS: "computer-science",
            CDSDS: "data-science",
            CASEC: "economics",
            ENGEC: "electrical-computer-eng",
            ENGEK: "eng-core",
            CASMA: "mathematics-statistics",
            ENGME: "mechanical-eng",
        }),
        []
    );
    const subject = subjectMap[id.slice(0, 5)];

    useEffect(() => {
        axios
            .post(`${backend}/academics/courses/professors`, {
                subject: subject,
            })
            .then((res) => {
                setProfessors(
                    res.data.map((professor) => ({
                        value: professor.name,
                        label: professor.name,
                    }))
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [subject]);

    const adjustReviewAreaHeight = (textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight + 2}px`;
    };

    const resetReview = () => {
        setAnon(false);
        setProfessor({ value: "", label: "" });
        setUsefulness({ value: "", label: "" });
        setDifficulty({ value: "", label: "" });
        setRating({ value: "", label: "" });
        setReview("");
    };

    const handleAddReview = () => {
        if (
            professor.value === "" ||
            usefulness.value === "" ||
            difficulty.value === "" ||
            rating.value === ""
        ) {
            enqueueSnackbar("Fill in all required fields", {
                variant: "error",
            });
        } else {
            const reviewObj = {
                user: user.displayName,
                bu_email: user.email,
                anon,
                id,
                professor: professor.value,
                subject,
                usefulness: usefulness.value,
                difficulty: difficulty.value,
                rating: rating.value,
                review,
                date: new Date().toISOString().replace("Z", "+00:00"),
            };
            axios
                .post(`${backend}/academics/courses/add-review`, reviewObj)
                .then(() => {
                    console.log(reviewObj);
                    enqueueSnackbar("Added review successfully", {
                        variant: "success",
                    });
                    resetReview();
                    navigate(`/academics/courses/${level}/${id}`);
                })
                .catch((error) => {
                    enqueueSnackbar("Failed to add review", {
                        variant: "error",
                    });
                    console.log(error);
                });
        }
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3 my-auto">Add Review for {id}</h2>

            <div className="p-3 flex">
                <p className="mr-1">
                    <a
                        href={"/"}
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        Home
                    </a>
                    {" /"}
                </p>
                <p className="mr-1">
                    <a
                        href={"/academics"}
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        Academics
                    </a>
                    {" /"}
                </p>
                {level === "undergrad" ? (
                    <p className="mr-1">
                        <a
                            href={"/academics/courses"}
                            className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                        >
                            Courses
                        </a>
                        {" /"}
                    </p>
                ) : (
                    <p className="mr-1">
                        <a
                            href={"/academics/graduate"}
                            className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                        >
                            Graduate
                        </a>
                        {" /"}
                    </p>
                )}
                <p className="mr-1">
                    <a
                        href={`/academics/courses/${level}/${id}`}
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        {id}
                    </a>
                    {" /"}
                </p>
                <p>Add Review</p>
            </div>

            {selectDropdowns.map((item) => (
                <div
                    key={item.label}
                    className="w-96 mx-auto my-2 flex flex-wrap justify-between"
                >
                    <label className="my-auto text-2xl">{item.label}</label>
                    <Select
                        className="w-56"
                        options={item.options}
                        value={item.value}
                        onChange={(selectedOption) =>
                            selectedOption && item.update(selectedOption)
                        }
                        isSearchable={item.searchable}
                    />
                </div>
            ))}
            <div className="w-96 mx-auto my-2 flex flex-wrap justify-between">
                <label className="my-auto text-2xl">Review</label>
                <textarea
                    name="review"
                    value={review}
                    className="w-56 resize-none p-2 border-1 border-gray-300 rounded-md"
                    onChange={(e) => {
                        setReview(e.target.value);
                        adjustReviewAreaHeight(e.target);
                    }}
                    rows={1}
                />
            </div>

            <CustomCheckbox
                label="Keep review anonymous"
                labelPlacement="start"
                checked={anon}
                setChecked={setAnon}
            />

            <p className="my-4">* indicates required field</p>

            <button
                className="my-2 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                type="button"
                onClick={handleAddReview}
            >
                Add Review
            </button>
        </div>
    );
};

export default AddReview;
