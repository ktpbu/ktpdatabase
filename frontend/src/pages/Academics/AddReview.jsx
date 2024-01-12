import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { useState, useMemo } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import "./AddReview.css";
import "./../page-content.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddReview = () => {
    const [loading, setLoading] = useState(false);
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

    const professors = useMemo(
        () => ({
            ENGBE: [],
            CASCS: [
                "JONATHAN APPAVOO",
                "MANOS ATHANASSOULIS",
                "GARY BENSON",
                "AZER BESTAVROS",
                "MARGRIT BETKE",
                "MARK BUN",
                "JOHN BYERS",
                "RAN CANETTI",
                "ED CHIEN",
                "SANG (“PETER”) CHIN",
                "MARK CROVELLA",
                "RONALD CZIK",
                "ANKUSH DAS",
                "TAYMAZ DAVOODI",
                "PERRY DONHAM",
                "IDDO DRORI",
                "SHEREIF EL-SHEIKH",
                "ALINA ENE",
                "DORA ERDOS",
                "MARCO GABOARDI",
                "PETER GACS",
                "LANCE GALLETTI",
                "PETER B. GOLBUS",
                "SHARON GOLDBERG",
                "STEVE HOMER",
                "TIAGO JANUARIO",
                "VASILIKI KALAVRI",
                "GABE KAPTCHUK",
                "ASSAF KFOURY",
                "GEORGE KOLLIOS",
                "LEONID LEVIN",
                "JOHN LIAGOURIS",
                "ANDREA LINCOLN",
                "RENATO MANCUSO",
                "ABRAHAM MATTA",
                "NATHAN MULL",
                "PREETHI NARAYANAN",
                "SABRINA NEUMAN",
                "CHRISTINE PAPADAKIS-KANARIS",
                "BRYAN PLUMMER",
                "SOFYA RASKHODNIKOVA",
                "LEONID REYZIN",
                "KATE SAENKO",
                "STAN SCLAROFF",
                "ADAM SMITH",
                "WAYNE SNYDER",
                "AARON STEVENS",
                "ALLEY STOUGHTON",
                "DAVE SULLIVAN",
                "EVIMARIA TERZI",
                "ERAN TROMER",
                "CHARALAMPOS TSOURAKAKIS",
                "RICH WEST",
                "EMILY WHITING",
                "DERRY WIJAYA",
                "ANDREW WOOD",
                "HONGWEI XI",
                "FAN YANG",
            ],
            CDSDS: [],
            CASEC: [],
            ENGEC: [],
            ENGEK: [],
            CASMA: [],
            ENGME: [],
        }),
        []
    );

    const handleAddReview = () => {
        if (
            professor === "Choose" ||
            usefulness === "Choose" ||
            difficulty === "Choose" ||
            rating === "Choose"
        ) {
            enqueueSnackbar(
                "Must select professor, usefulness, difficulty, and rating",
                { variant: "error" }
            );
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
        console.log(reviewObj);
        setLoading(true);
        axios
            .post(`${backend}/academics/courses/add-review`, reviewObj, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Added review successfully", {
                    variant: "success",
                });
                navigate(`/academics/courses/${id}`);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error", { variant: "error" });
                console.log(error);
            });
    };

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
                            {professors[id.slice(0, 5)].map((value) => (
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
                <button
                    className="add-review-add-button"
                    onClick={handleAddReview}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddReview;
