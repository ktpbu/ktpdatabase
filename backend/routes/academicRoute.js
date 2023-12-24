import express from "express"
import COURSES from "./../data/course-info.json" assert { type: "json" };
const router = express.Router()


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


export default router