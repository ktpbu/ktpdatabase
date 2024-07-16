import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomCheckbox from "../../components/CustomCheckbox";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditReview = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const reviewForm = useForm({
        defaultValues: {
            user: "",
            bu_email: "",
            anon: "",
            course_id: "",
            professor: { value: "", label: "" },
            subject: "",
            usefulness: { value: 0, label: "" },
            difficulty: { value: 0, label: "" },
            rating: { value: 0, label: "" },
            review: "",
            date: new Date().toISOString().replace("Z", "+00:00"),
        },
    });

    const { register, handleSubmit, control, reset } = reviewForm;

    const { id } = useParams();
    const [anon, setAnon] = useState(false);
    const [courseId, setCourseId] = useState("");
    const [subject, setSubject] = useState("");

    useEffect(() => {
        const getReview = async () => {
            setLoading(true);
            axios
                .get(`${backend}/account/reviews/get-review/${id}`)
                .then((response) => {
                    reset({
                        ...response.data,
                        user: response.data.user,
                        bu_email: response.data.bu_email,
                        anon: response.data.anon,
                        course_id: response.data.course_id,
                        professor: {
                            value: response.data.professor,
                            label: response.data.professor,
                        },
                        subject: response.data.subject,
                        usefulness: {
                            value: response.data.usefulness,
                            label: response.data.usefulness.toString(),
                        },
                        difficulty: {
                            value: response.data.difficulty,
                            label: response.data.difficulty.toString(),
                        },
                        rating: {
                            value: response.data.rating,
                            label: response.data.rating.toString(),
                        },
                        review: response.data.review,
                    });
                    setAnon(response.data.anon);
                    setCourseId(response.data.course_id);
                    setSubject(response.data.subject);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };
        getReview();
    }, [id, reset]);

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

    const onSubmit = (data) => {
        data = {
            ...data,
            anon: anon,
            date: new Date().toISOString().replace("Z", "+00:00"),
        };
        axios
            .put(`${backend}/account/reviews/edit-review/${id}`, data)
            .then(() => {
                console.log("Edited review", data);
                enqueueSnackbar("Successfully edited review", {
                    variant: "success",
                });
                navigate("/account/reviews", { replace: true });
            })
            .catch(() => {
                enqueueSnackbar("Failed to edit review", {
                    variant: "error",
                });
            });
    };

    const onError = (errors) => {
        console.log("Review form errors", errors);
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
            <h2 className="my-auto p-3 text-start text-[#234c8b]">
                Edit Review for {courseId}
            </h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Reviews", path: "/account/reviews" },
                ]}
                current="Edit Review"
            />

            {!loading && (
                <form
                    className="w-fit mx-auto sm:flex sm:flex-col sm:justify-center sm:align-middle"
                    onSubmit={handleSubmit(onSubmit, onError)}
                    noValidate
                >
                    {selectDropdowns.map((item, index) => {
                        const fieldName = item.label.toLowerCase();
                        return (
                            <div
                                key={index}
                                className="w-fit mx-auto my-2 flex flex-col sm:w-96 sm:my-2 sm:flex-row sm:flex-wrap sm:justify-between"
                            >
                                <label className="w-fit text-left text-2xl">
                                    {item.label}
                                </label>
                                <div>
                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        rules={{
                                            validate: {
                                                notDefault: (value) =>
                                                    value.value !== "" &&
                                                    value.label !== "",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                className="w-56"
                                                options={item.options}
                                                id={fieldName}
                                                isSearchable={true}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="w-fit mx-auto flex flex-col sm:w-96 sm:my-2 sm:flex-row sm:flex-wrap sm:justify-between">
                        <label className="w-fit mb-1 text-left text-2xl sm:my-auto">
                            Review
                        </label>
                        <textarea
                            name="review"
                            {...register("review")}
                            className="w-56 resize-none p-1 border-1 border-gray-300 rounded-md sm:my-auto"
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
                        className="w-fit block mx-auto my-2 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl bg-white"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditReview;
