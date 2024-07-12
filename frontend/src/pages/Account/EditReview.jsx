import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useSnackbar } from "notistack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomCheckbox from "../../components/CustomCheckbox";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditReview = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { id } = useParams();

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

    const [professor, setProfessor] = useState({});
    const [usefulness, setUsefulness] = useState({ value: "", label: "" });
    const [difficulty, setDifficulty] = useState({ value: "", label: "" });
    const [rating, setRating] = useState({ value: "", label: "" });
    const [anon, setAnon] = useState(false);
    const [review, setReview] = useState("");

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

    const adjustReviewAreaHeight = (textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight + 2}px`;
    };

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
                user: user.displayName,
                bu_email: user.email,
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
            <h2 className="my-auto p-3 text-start text-[#234c8b]">
                Edit Review for {reviewResponse.course_id}
            </h2>

            <CustomBreadcrumb
                previous={[
                    { title: "Home", path: "/" },
                    { title: "Reviews", path: "/account/reviews" },
                ]}
                current="Edit Review"
            />

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
                <textarea
                    name="review"
                    value={review}
                    className="w-48 resize-none p-2 border-1 border-gray-300 rounded-md"
                    onChange={(e) => {
                        setReview(e.target.value);
                        adjustReviewAreaHeight(e.target);
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
                className="my-2 p-2 text-xl border-2 border-solid hover:border-[#234c8b] rounded-3xl"
                type="button"
                onClick={handleSaveReview}
            >
                Save Review
            </button>
        </div>
    );
};

export default EditReview;
