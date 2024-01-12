import { useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { useState, useMemo } from "react";

import "./AddReview.css";
import "./../page-content.css";

const AddReview = () => {
    const user = "test";
    const { id } = useParams();
    const [professor, setProfessor] = useState("");
    const [usefulness, setUsefulness] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");
    const values = ["1", "2", "3", "4", "5"];

    const professors = useMemo(
        () => ({
            ENGBE: [],
            CASCS: [],
            CDSDS: [],
            CASEC: [],
            ENGEC: [],
            ENGEK: [],
            CASMA: [],
            ENGME: [],
        }),
        []
    );

    return (
        <div className="page-content">
            <Breadcrumb className="customBreadcrumb p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/">Academics</Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/academics/courses/">
                    {id}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Add Review</Breadcrumb.Item>
            </Breadcrumb>

            <h2 className="text-start p-3 my-auto">Add Review for {id}</h2>

            <div className="add-review-field-container">
                <div className="add-review-individual-field-container">
                    <div className="add-review-field-label">
                        <label>Professor</label>
                    </div>
                    <div className="add-review-field">
                        <select
                            className="add-review-select"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
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
                        <label>Usefulness</label>
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
                        <label>Difficulty</label>
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
                        <label>Rating</label>
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
            </div>
        </div>
    );
};

export default AddReview;
