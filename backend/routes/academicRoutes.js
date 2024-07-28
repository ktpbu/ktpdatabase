import express from "express";

import supabase from "../supabaseClient.js";
import { Reviews } from "../models/reviewModel.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// course dependency imports
const csEdges = require("../data/academics/courses/dependencies/edges/computer-science-edges.json");
const csNodes = require("../data/academics/courses/dependencies/nodes/computer-science-nodes.json");
const dsEdges = require("../data/academics/courses/dependencies/edges/data-science-edges.json");
const dsNodes = require("../data/academics/courses/dependencies/nodes/data-science-nodes.json");
const econEdges = require("../data/academics/courses/dependencies/edges/economics-edges.json");
const econNodes = require("../data/academics/courses/dependencies/nodes/economics-nodes.json");
const mathEdges = require("../data/academics/courses/dependencies/edges/mathematics-statistics-edges.json");
const mathNodes = require("../data/academics/courses/dependencies/nodes/mathematics-statistics-nodes.json");

// academic resources imports
const jointMajors = require("../data/academics/resources/joint-majors.json");
const usefulLinks = require("../data/academics/resources/useful-links.json");

const subjectMap = {
    "biomedical-eng": {
        edges: "",
        nodes: "",
    },
    "computer-science": {
        edges: csEdges,
        nodes: csNodes,
    },
    "data-science": {
        edges: dsEdges,
        nodes: dsNodes,
    },
    economics: {
        edges: econEdges,
        nodes: econNodes,
    },
    "electrical-computer-eng": {
        edges: "",
        nodes: "",
    },
    "eng-core": {
        edges: "",
        nodes: "",
    },
    "mathematics-statistics": {
        edges: mathEdges,
        nodes: mathNodes,
    },
    "mechanical-eng": {
        edges: "",
        nodes: "",
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
    const { data, error } = await supabase
        .from("course_info")
        .select("*")
        .eq("level", req.params.level)
        .eq("subject", req.params.subject);
    return res.json(data);
});

// gets subject professor list
router.post("/courses/professors", async (req, res) => {
    console.log(req.body);
    const { data, error } = await supabase
        .from("professor_info")
        .select("name")
        .eq("subject", req.body.subject);
    return res.json(data);
});

// gets individual course info
router.get("/courses/:level/:subject/:id", async (req, res) => {
    console.log(req);
    const { data, error } = await supabase
        .from("course_info")
        .select("*")
        .eq("code", req.params.id.slice(3))
        .eq("subject", req.params.subject)
        .eq("level", req.params.level);
    return res.json(data);
});

// gets individual course reviews
// not sure why the review request only works with post and not get
router.post("/courses/reviews/:code", async (req, res) => {
    console.log(req);
    try {
        const courseID = req.params.code;
        const courseReviews = await Reviews.find({ course_id: courseID }).sort({
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
        const newReview = new Reviews({
            user: req.body.user,
            bu_email: req.body.bu_email,
            anon: req.body.anon,
            course_id: req.body.course_id,
            professor: req.body.professor.value,
            subject: req.body.subject,
            usefulness: req.body.usefulness.value,
            difficulty: req.body.difficulty.value,
            rating: req.body.rating.value,
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
