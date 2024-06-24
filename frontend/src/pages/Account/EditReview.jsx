import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";
import Select from "react-select";
import { useSnackbar } from "notistack";

import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditReview = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [userData, setUserData] = useState({});
    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const { id } = useParams();

    const [reviewResponse, setReviewResponse] = useState({});

    useEffect(() => {
        const getReview = async () => {
            try {
                const response = await axios.get(
                    `${backend}/account/reviews/get-review/${id}`
                );
                setReviewResponse(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getReview();
    }, [id]);

    const [professors, setProfessors] = useState([]);

    const user = `${userData.first} ${userData.last}`;
    const [professor, setProfessor] = useState({});
    const [usefulness, setUsefulness] = useState({ value: "", label: "" });
    const [difficulty, setDifficulty] = useState({ value: "", label: "" });
    const [rating, setRating] = useState({ value: "", label: "" });
    const [anon, setAnon] = useState(false);
    const [review, setReview] = useState(reviewResponse.review);

    useEffect(() => {
        setProfessor({
            value: reviewResponse.professor,
            label: reviewResponse.professor,
        });
        setUsefulness({
            value: reviewResponse.usefulness,
            label: reviewResponse.usefulness,
        });
        setDifficulty({
            value: reviewResponse.difficulty,
            label: reviewResponse.difficulty,
        });
        setRating({
            value: reviewResponse.rating,
            label: reviewResponse.rating,
        });
        setAnon(reviewResponse.anon);
        setReview(reviewResponse.review);
    }, [reviewResponse]);

    const values = [
        { value: 5, label: "5" },
        { value: 4, label: "4" },
        { value: 3, label: "3" },
        { value: 2, label: "2" },
        { value: 1, label: "1" },
    ];

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

    useEffect(() => {
        axios
            .post(`${backend}/academics/courses/professors`, {
                subject: reviewResponse.subject,
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
    }, [reviewResponse.subject]);

    const handleSaveReview = () => {
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
                user,
                bu_email: userData.bu_email,
                anon,
                id,
                professor: professor.value,
                subject: reviewResponse.subject,
                usefulness: usefulness.value,
                difficulty: difficulty.value,
                rating: rating.value,
                review: reviewResponse.review,
                date: new Date().toISOString().replace("Z", "+00:00"),
            };
            try {
                console.log(reviewObj);
                axios.put(
                    `${backend}/account/reviews/edit-review/${id}`,
                    reviewObj
                );
                enqueueSnackbar("Successfully edited review", {
                    variant: "success",
                });
                navigate("/account/reviews");
            } catch (error) {
                enqueueSnackbar("Failed to edit review", { variant: "error" });
            }
        }
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3 my-auto">
                Edit Review for {reviewResponse.course_id}
            </h2>

            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/reviews">
                    Reviews
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Review</Breadcrumb.Item>
            </Breadcrumb>

            {selectDropdowns.map((item) => (
                <div
                    key={item.label}
                    className="w-96 mx-auto my-2 flex flex-wrap justify-between"
                >
                    <label className="my-auto text-2xl">{item.label}</label>
                    <Select
                        className="w-48"
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
                <input
                    name="review"
                    value={review}
                    className="w-48 h-8 p-2 border-1 border-gray-300 rounded-md"
                    onChange={(e) => {
                        setReview(e.target.value);
                    }}
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
                className="my-2 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                type="button"
                onClick={handleSaveReview}
            >
                Save Review
            </button>
        </div>
    );
};

export default EditReview;
