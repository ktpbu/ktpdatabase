import express from "express";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const internshipResources = require("../data/professional/resources/internship-resources.json");

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Professional backend here");
});

// gets internship resource links
router.get("/resources/internship-resources", async (req, res) => {
    console.log(req.body);
    return res.json({
        internshipResources,
    });
});

export default router;
