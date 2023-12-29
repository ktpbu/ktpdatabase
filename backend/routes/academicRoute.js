import express from "express";
import COURSES from "./../data/course-info.json" assert { type: "json" };
import dependencyNodes from "./../data/dependency-nodes.json" assert { type: "json" };
import dependencyEdges from "./../data/dependency-edges.json" assert { type: "json" };
const router = express.Router();

router.get("/courses", async (req, res) => {
    return res.json(COURSES.course_list);
});

router.get("/courses/:id", async (req, res) => {
    return res.json(COURSES.course_list[req.params.id]);
});

router.get("/resources", async (req, res) => {
    console.log(req);
    return res.status(234).send("Resouces for Academics at BU backend");
});

router.get("/courses/dependencies/nodes/:subject", async (req, res) => {
    return res.json(dependencyNodes[req.params.subject]);
});

router.get("/courses/dependencies/edges/:subject", async (req, res) => {
    return res.json(dependencyEdges[req.params.subject]);
});

export default router;
