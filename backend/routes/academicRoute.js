import express from "express";
import COURSES from "./../data/course-info.json" assert { type: "json" };
import bmeCourses from "./../data/courses/course-info/undergrad/biomedical-eng-ug-course-info.json" assert { type: "json" };
import csCourses from "./../data/courses/course-info/undergrad/computer-science-ug-course-info.json" assert { type: "json" };
import dsCourses from "./../data/courses/course-info/undergrad/data-science-ug-course-info.json" assert { type: "json" };
import econCourses from "./../data/courses/course-info/undergrad/economics-ug-course-info.json" assert { type: "json" };
import eceCourses from "./../data/courses/course-info/undergrad/electrical-computer-eng-ug-course-info.json" assert { type: "json" };
import engCoreCourses from "./../data/courses/course-info/undergrad/eng-core-ug-course-info.json" assert { type: "json" };
import mathCourses from "./../data/courses/course-info/undergrad/mathematics-statistics-ug-course-info.json" assert { type: "json" };
import mecheCourses from "./../data/courses/course-info/undergrad/mechanical-eng-ug-course-info.json" assert { type: "json" };
import dependencyNodes from "./../data/dependency-nodes.json" assert { type: "json" };
import dependencyEdges from "./../data/dependency-edges.json" assert { type: "json" };

const router = express.Router();

const subjectMap = {
    "biomedical-eng": bmeCourses,
    "computer-science": csCourses,
    "data-science": dsCourses,
    economics: econCourses,
    "electrical-computer-eng": eceCourses,
    "eng-core": engCoreCourses,
    "mathematics-statistics": mathCourses,
    "mechanical-eng": mecheCourses,
};

router.get("/resources", async (req, res) => {
    console.log(req);
    return res.status(234).send("Resouces for Academics at BU backend");
});

// get subject course list
router.get("/courses/undergrad/:subject", async (req, res) => {
    console.log(req);
    return res.json(subjectMap[req.params.subject]);
});

// get individual course info
router.get("/courses/undergrad/:subject/:id", async (req, res) => {
    console.log(req);
    return res.json(subjectMap[req.params.subject][req.params.id]);
});

// get dependency map nodes
router.get("/courses/dependencies/nodes/:subject", async (req, res) => {
    console.log(req);
    return res.json(dependencyNodes[req.params.subject]);
});

// get dependency map edges
router.get("/courses/dependencies/edges/:subject", async (req, res) => {
    console.log(req);
    return res.json(dependencyEdges[req.params.subject]);
});

export default router;
