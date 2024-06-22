import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Account backend here");
});

router.get("/admin/get-users", async (req, res) => {
    console.log(req);
    try {
        const users = await User.find({}).sort({
            first: 1,
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
