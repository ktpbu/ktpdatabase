import express from "express";

// undergraduate course information imports
import bmeCoursesUG from "../data/academics/courses/course-info/undergrad/biomedical-eng-ug-course-info.json" assert { type: "json" };
import csCoursesUG from "../data/academics/courses/course-info/undergrad/computer-science-ug-course-info.json" assert { type: "json" };
import dsCoursesUG from "../data/academics/courses/course-info/undergrad/data-science-ug-course-info.json" assert { type: "json" };
import econCoursesUG from "../data/academics/courses/course-info/undergrad/economics-ug-course-info.json" assert { type: "json" };
import eceCoursesUG from "../data/academics/courses/course-info/undergrad/electrical-computer-eng-ug-course-info.json" assert { type: "json" };
import engCoreCoursesUG from "../data/academics/courses/course-info/undergrad/eng-core-ug-course-info.json" assert { type: "json" };
import mathCoursesUG from "../data/academics/courses/course-info/undergrad/mathematics-statistics-ug-course-info.json" assert { type: "json" };
import mecheCoursesUG from "../data/academics/courses/course-info/undergrad/mechanical-eng-ug-course-info.json" assert { type: "json" };

// graduate course information imports
import bmeCoursesG from "../data/academics/courses/course-info/grad/biomedical-eng-g-course-info.json" assert { type: "json" };
import csCoursesG from "../data/academics/courses/course-info/grad/computer-science-g-course-info.json" assert { type: "json" };
import dsCoursesG from "../data/academics/courses/course-info/grad/data-science-g-course-info.json" assert { type: "json" };
import econCoursesG from "../data/academics/courses/course-info/grad/economics-g-course-info.json" assert { type: "json" };
import eceCoursesG from "../data/academics/courses/course-info/grad/electrical-computer-eng-g-course-info.json" assert { type: "json" };
import engCoreCoursesG from "../data/academics/courses/course-info/grad/eng-core-g-course-info.json" assert { type: "json" };
import mathCoursesG from "../data/academics/courses/course-info/grad/mathematics-statistics-g-course-info.json" assert { type: "json" };
import mecheCoursesG from "../data/academics/courses/course-info/grad/mechanical-eng-g-course-info.json" assert { type: "json" };

// subject professor imports
import csProfessors from "../data/academics/courses/professors/computer-science-professors.json" assert { type: "json" };
import dsProfessors from "../data/academics/courses/professors/data-science-professors.json" assert { type: "json" };
import econProfessors from "../data/academics/courses/professors/economics-professors.json" assert { type: "json" };
import engProfessors from "../data/academics/courses/professors/engineering-professors.json" assert { type: "json" };
import mathProfessors from "../data/academics/courses/professors/mathematics-statistics-professors.json" assert { type: "json" };

// course dependency imports
import csEdges from "../data/academics/courses/dependencies/edges/computer-science-edges.json" assert { type: "json" };
import csNodes from "../data/academics/courses/dependencies/nodes/computer-science-nodes.json" assert { type: "json" };
import dsEdges from "../data/academics/courses/dependencies/edges/data-science-edges.json" assert { type: "json" };
import dsNodes from "../data/academics/courses/dependencies/nodes/data-science-nodes.json" assert { type: "json" };
import econEdges from "../data/academics/courses/dependencies/edges/economics-edges.json" assert { type: "json" };
import econNodes from "../data/academics/courses/dependencies/nodes/economics-nodes.json" assert { type: "json" };
import mathEdges from "../data/academics/courses/dependencies/edges/mathematics-statistics-edges.json" assert { type: "json" };
import mathNodes from "../data/academics/courses/dependencies/nodes/mathematics-statistics-nodes.json" assert { type: "json" };

// academic resources imports
import jointMajors from "../data/academics/resources/joint-majors.json" assert { type: "json" };
import usefulLinks from "../data/academics/resources/useful-links.json" assert { type: "json" };

// database imports
import { Review } from "../models/reviewModel.js";

const subjectMap = {
    "biomedical-eng": {
        "course-info-ug": bmeCoursesUG,
        "course-info-g": bmeCoursesG,
        edges: "",
        nodes: "",
        professors: engProfessors,
    },
    "computer-science": {
        "course-info-ug": csCoursesUG,
        "course-info-g": csCoursesG,
        edges: csEdges,
        nodes: csNodes,
        professors: csProfessors,
    },
    "data-science": {
        "course-info-ug": dsCoursesUG,
        "course-info-g": dsCoursesG,
        edges: dsEdges,
        nodes: dsNodes,
        professors: dsProfessors,
    },
    economics: {
        "course-info-ug": econCoursesUG,
        "course-info-g": econCoursesG,
        edges: econEdges,
        nodes: econNodes,
        professors: econProfessors,
    },
    "electrical-computer-eng": {
        "course-info-ug": eceCoursesUG,
        "course-info-g": eceCoursesG,
        edges: "",
        nodes: "",
        professors: engProfessors,
    },
    "eng-core": {
        "course-info-ug": engCoreCoursesUG,
        "course-info-g": engCoreCoursesG,
        edges: "",
        nodes: "",
        professors: engProfessors,
    },
    "mathematics-statistics": {
        "course-info-ug": mathCoursesUG,
        "course-info-g": mathCoursesG,
        edges: mathEdges,
        nodes: mathNodes,
        professors: mathProfessors,
    },
    "mechanical-eng": {
        "course-info-ug": mecheCoursesUG,
        "course-info-g": mecheCoursesG,
        edges: "",
        nodes: "",
        professors: engProfessors,
    },
};

const router = express.Router();

router.get("/resources", async (req, res) => {
    console.log(req);
    return res.status(234).send("Resources for Academics at BU backend");
});

// gets subject course list
router.get("/courses/:level/:subject", async (req, res) => {
    console.log(req);
    if (req.params.level === "undergrad") {
        return res.json(subjectMap[req.params.subject]["course-info-ug"]);
    } else if (req.params.level === "grad") {
        return res.json(subjectMap[req.params.subject]["course-info-g"]);
    }
});

// gets subject professor list
router.post("/courses/professors", async (req, res) => {
    console.log(req.body);
    return res.json(subjectMap[req.body.subject]["professors"]);
});

// gets individual course info
router.get("/courses/:level/:subject/:id", async (req, res) => {
    console.log(req);
    if (req.params.level === "undergrad") {
        return res.json(
            subjectMap[req.params.subject]["course-info-ug"][req.params.id]
        );
    } else if (req.params.level === "grad") {
        return res.json(
            subjectMap[req.params.subject]["course-info-g"][req.params.id]
        );
    }
});

// gets individual course reviews
// not sure why the review request only works with post and not get
router.post("/courses/reviews/:id", async (req, res) => {
    console.log(req);
    try {
        const courseID = req.params.id;
        const courseReviews = await Review.find({ courseID: courseID }).sort({
            date: -1,
        });
        return res.status(200).json(courseReviews);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// adds individual course reviews
router.post("/courses/add-review", async (req, res) => {
    console.log(req.body);
    try {
        const newReview = new Review({
            user: req.body.user,
            anon: req.body.anon,
            courseID: req.body.id,
            professor: req.body.professor,
            usefulness: req.body.usefulness,
            difficulty: req.body.difficulty,
            rating: req.body.rating,
            review: req.body.review,
            date: req.body.date,
        });
        console.log(newReview);
        await newReview.save();
        return res.status(200).send({ message: "Added review successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// gets dependency map edges and nodes
router.post("/courses/dependencies", async (req, res) => {
    console.log(req.body);
    const subject = req.body.subject;
    return res.json({
        nodes: subjectMap[subject]["nodes"],
        edges: subjectMap[subject]["edges"],
    });
});

// gets useful resource links
router.get("/resources/useful-links", async (req, res) => {
    console.log(req.body);
    return res.json({
        usefulLinks,
    });
});

// gets joint major links
router.get("/resources/joint-majors", async (req, res) => {
    console.log(req.body);
    return res.json({
        jointMajors,
    });
});

export default router;
