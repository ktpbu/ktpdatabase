import express from "express";

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Calendar backend here");
});

export default router;
