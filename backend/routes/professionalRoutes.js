import express from "express";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const internshipResources = require("../data/professional/resources/internship-resources.json");
const ktpChapters = require("../data/professional/resources/ktp-chapters.json");

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Professional backend here");
});

// gets internship resource links
router.get("/resources/internship-resources", async (req, res) => {
    console.log(req);
    return res.json({
        internshipResources,
    });
});

router.get("/resources/ktp-chapters", async (req, res) => {
    console.log(req);
    return res.json({
        ktpChapters,
    });
});

export default router;
