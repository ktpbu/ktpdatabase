import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Select from "react-select";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useForm } from "react-hook-form";

import CustomCheckbox from "../../components/CustomCheckbox";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddReview = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { level, id } = useParams();
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

    const [anon, setAnon] = useState(false);

    const [professors, setProfessors] = useState([]);
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

    const values = [
        { value: 5, label: "5" },
        { value: 4, label: "4" },
        { value: 3, label: "3" },
        { value: 2, label: "2" },
        { value: 1, label: "1" },
    ];

    const selectDropdowns = [
        {
            label: "Professor",
            options: professors,
            searchable: true,
        },
        {
            label: "Usefulness",
            options: values,
            searchable: false,
        },
        {
            label: "Difficulty",
            options: values,
            searchable: false,
        },
        {
            label: "Rating",
            options: values,
            searchable: false,
        },
    ];

    const reviewForm = useForm({
        defaultValues: {
            user: "",
            bu_email: "",
            anon: anon,
            id: id,
            professor: { value: "", label: "" },
            subject: subject,
            usefulness: { value: "", label: "" },
            difficulty: { value: "", label: "" },
            rating: { value: "", label: "" },
            review: "",
            date: new Date().toISOString().replace("Z", "+00:00"),
        },
    });

    const { register, handleSubmit, setValue } = reviewForm;

    const onSubmit = (data) => {
        data = {
            ...data,
            user: user.displayName,
            bu_email: user.email,
            anon: anon,
            date: new Date().toISOString().replace("Z", "+00:00"),
        };
        try {
            axios
                .post(`${backend}/academics/courses/add-review`, data)
                .then(() => {
                    console.log("Review submitted", data);
                    enqueueSnackbar("Added review successfully", {
                        variant: "success",
                    });
                    navigate(`/academics/courses/${level}/${id}`);
                })
                .catch((error) => {
                    enqueueSnackbar("Failed to add review", {
                        variant: "error",
                    });
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const onError = (errors) => {
        console.log("Form errors", errors);
        enqueueSnackbar(
            "Professor, Usefulness, Difficulty, and Rating are required",
            {
                variant: "error",
            }
        );
    };

    const adjustReviewAreaHeight = (textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight + 2}px`;
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3 my-auto">Add Review for {id}</h2>
            <div className="p-3 flex flex-wrap">
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

            <form
                className="flex flex-col justify-center align-middle"
                onSubmit={handleSubmit(onSubmit, onError)}
                noValidate
            >
                {selectDropdowns.map((item, index) => {
                    const fieldName = item.label.toLowerCase();
                    return (
                        <div
                            key={index}
                            className="w-96 mx-auto my-2 flex flex-wrap justify-between"
                        >
                            <label className="my-auto text-2xl">
                                {item.label}
                            </label>
                            <div>
                                <Select
                                    className="w-56"
                                    options={item.options}
                                    id={fieldName}
                                    {...register(fieldName, {
                                        validate: {
                                            notDefault: (fieldValue) => {
                                                return (
                                                    fieldValue.value !== "" &&
                                                    fieldValue.label !== ""
                                                );
                                            },
                                        },
                                    })}
                                    onChange={(selectedOption) => {
                                        setValue(fieldName, selectedOption);
                                    }}
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                    );
                })}

                <div className="w-96 mx-auto my-2 flex flex-wrap justify-between">
                    <label className="my-auto text-2xl">Review</label>
                    <textarea
                        name="review"
                        {...register("review")}
                        className="w-56 resize-none p-2 border-1 border-gray-300 rounded-md"
                        onChange={(e) => {
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

                <button
                    className="w-fit block mx-auto my-2 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add Review
                </button>
            </form>
        </div>
    );
};

export default AddReview;
