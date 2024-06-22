import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Account backend here");
});

// gets all users
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

// adds a new user
router.post("/admin/add-user", async (req, res) => {
    console.log(req.body);
    try {
        const existingUser = await User.find({ bu_email: req.body.bu_email });
        if (existingUser.length > 0) {
            return res.status(409).send({ message: "User already exists" });
        }
        const newUser = new User({
            first: req.body.first,
            last: req.body.last,
            bu_email: req.body.bu_email,
            class: req.body.class,
            is_admin: req.body.is_admin,
        });
        console.log(newUser);
        await newUser.save();
        return res.status(200).send({ message: "Added user successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
