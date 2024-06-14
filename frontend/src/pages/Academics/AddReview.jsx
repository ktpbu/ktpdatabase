import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import "./AddReview.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddReview = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const user = "test";
    const { id } = useParams();
    const [professor, setProfessor] = useState("Choose");
    const [usefulness, setUsefulness] = useState("Choose");
    const [difficulty, setDifficulty] = useState("Choose");
    const [rating, setRating] = useState("Choose");
    const [review, setReview] = useState("");
    const values = ["1", "2", "3", "4", "5"];
    const [professors, setProfessors] = useState([]);

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
                setProfessors(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [subject]);

    const handleAddReview = () => {
        if (
            professor === "Choose" ||
            usefulness === "Choose" ||
            difficulty === "Choose" ||
            rating === "Choose"
        ) {
            enqueueSnackbar("Must complete all required fields", {
                variant: "error",
            });
            return;
        }
        const reviewObj = {
            user,
            id,
            professor,
            usefulness: parseInt(usefulness),
            difficulty: parseInt(difficulty),
            rating: parseInt(rating),
            review,
            date: new Date().toISOString().replace("Z", "+00:00"),
        };

        axios
            .post(`${backend}/academics/courses/add-review`, reviewObj)
            .then(() => {
                enqueueSnackbar("Added review successfully", {
                    variant: "success",
                });
                navigate(`/academics/courses/${id}`);
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" });
                console.log(error);
            });
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item href={`/academics/courses/${id}`}>
                    {id}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Add Review</Breadcrumb.Item>
            </Breadcrumb>

            <h2 className="text-start p-3 my-auto">Add Review for {id}</h2>

            <div className="add-review-field-container">
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Professor*</label>
                    </div>
                    <div className="add-review-field">
                        <select
                            className="add-review-select"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
                        >
                            <option value={null}>Choose</option>
                            {professors.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Usefulness*</label>
                    </div>
                    <div className="add-review-field">
                        <select
                            className="add-review-select"
                            value={usefulness}
                            onChange={(e) => setUsefulness(e.target.value)}
                        >
                            <option value={null}>Choose</option>
                            {values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Difficulty*</label>
                    </div>
                    <div className="add-review-field">
                        <select
                            className="add-review-select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value={null}>Choose</option>
                            {values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Rating*</label>
                    </div>
                    <div className="add-review-field">
                        <select
                            className="add-review-select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value={null}>Choose</option>
                            {values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Review</label>
                    </div>
                    <div className="add-review-field">
                        <input
                            className="add-review-input"
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                </div>
                <button onClick={handleAddReview}>Add</button>
                <p className="add-review-required-field-warning">
                    Fields marked with * are required
                </p>
            </div>
        </div>
    );
};

export default AddReview;
