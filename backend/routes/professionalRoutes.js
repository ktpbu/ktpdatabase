import express from "express";

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Professional backend here");
});

router.get("/resources", (res, req) => {
    console.log(req);
    res.status(234).send("Professional resources backend here");
});

export default router;
