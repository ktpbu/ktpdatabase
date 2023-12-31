import express from "express";

// course information imports
import bmeCourses from "../data/courses/course-info/undergrad/biomedical-eng-ug-course-info.json" assert { type: "json" };
import csCourses from "../data/courses/course-info/undergrad/computer-science-ug-course-info.json" assert { type: "json" };
import dsCourses from "../data/courses/course-info/undergrad/data-science-ug-course-info.json" assert { type: "json" };
import econCourses from "../data/courses/course-info/undergrad/economics-ug-course-info.json" assert { type: "json" };
import eceCourses from "../data/courses/course-info/undergrad/electrical-computer-eng-ug-course-info.json" assert { type: "json" };
import engCoreCourses from "../data/courses/course-info/undergrad/eng-core-ug-course-info.json" assert { type: "json" };
import mathCourses from "../data/courses/course-info/undergrad/mathematics-statistics-ug-course-info.json" assert { type: "json" };
import mecheCourses from "../data/courses/course-info/undergrad/mechanical-eng-ug-course-info.json" assert { type: "json" };

// course dependency imports
import csEdges from "../data/courses/dependencies/edges/computer-science-edges.json" assert { type: "json" };
import csNodes from "../data/courses/dependencies/nodes/computer-science-nodes.json" assert { type: "json" };
import dsEdges from "../data/courses/dependencies/edges/data-science-edges.json" assert { type: "json" };
import dsNodes from "../data/courses/dependencies/nodes/data-science-nodes.json" assert { type: "json" };
import econEdges from "../data/courses/dependencies/edges/economics-edges.json" assert { type: "json" };
import econNodes from "../data/courses/dependencies/nodes/economics-nodes.json" assert { type: "json" };
import mathEdges from "../data/courses/dependencies/edges/mathematics-statistics-edges.json" assert { type: "json" };
import mathNodes from "../data/courses/dependencies/nodes/mathematics-statistics-nodes.json" assert { type: "json" };

const subjectMap = {
    "biomedical-eng": { "course-info": bmeCourses },
    "computer-science": {
        "course-info": csCourses,
        edges: csEdges,
        nodes: csNodes,
    },
    "data-science": {
        "course-info": dsCourses,
        edges: dsEdges,
        nodes: dsNodes,
    },
    economics: {
        "course-info": econCourses,
        edges: econEdges,
        nodes: econNodes,
    },
    "electrical-computer-eng": { "course-info": eceCourses },
    "eng-core": { "course-info": engCoreCourses, edges: "", nodes: "" },
    "mathematics-statistics": {
        "course-info": mathCourses,
        edges: mathEdges,
        nodes: mathNodes,
    },
    "mechanical-eng": { "course-info": mecheCourses },
};

const router = express.Router();

router.get("/resources", async (req, res) => {
    console.log(req);
    return res.status(234).send("Resources for Academics at BU backend");
});

// get subject course list
router.get("/courses/undergrad/:subject", async (req, res) => {
    console.log(req);
    return res.json(subjectMap[req.params.subject]["course-info"]);
});

// get individual course info
router.get("/courses/undergrad/:subject/:id", async (req, res) => {
    console.log(req);
    return res.json(
        subjectMap[req.params.subject]["course-info"][req.params.id]
    );
});

// get dependency map nodes
router.get("/courses/dependencies/nodes/:subject", async (req, res) => {
    console.log(req);
    return res.json(subjectMap[req.params.subject]["nodes"]);
});

// get dependency map edges
router.get("/courses/dependencies/edges/:subject", async (req, res) => {
    console.log(req);
    return res.json(subjectMap[req.params.subject]["edges"]);
});

export default router;
