import express from "express";
import { Users } from "../models/userModel.js";
import { Reviews } from "../models/reviewModel.js";
import { Members } from "../models/memberModel.js";

const router = express.Router();

router.get("/", (res, req) => {
    console.log(req);
    res.status(234).send("Account backend here");
});

// get all users
router.get("/admin/get-users", async (req, res) => {
    console.log(req);
    try {
        const users = await Users.find({}).sort({
            first: 1,
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// add a user
router.post("/admin/add-user", async (req, res) => {
    console.log(req);
    try {
        const existingUser = await Users.find({ bu_email: req.body.bu_email });
        if (existingUser.length > 0) {
            return res.status(409).send({ message: "User already exists" });
        }
        const newUser = new Users({
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

// delete a user by id
router.delete("/admin/delete-user/:id", async (request, response) => {
    try {
        await Users.findByIdAndDelete(request.params.id);
        return response
            .status(200)
            .send({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get all members
router.get("/directory/get-members", async (req, res) => {
    console.log(req);
    try {
        const members = await Members.find({}).sort({
            FirstName: 1,
        });
        return res.status(200).json(members);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// get all reviews
router.get("/admin/get-reviews", async (req, res) => {
    console.log(req);
    try {
        const review = await Reviews.find({}).sort({ first: 1 });
        console.log(review);
        return res.status(200).json(review);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// get all reviews by a user
router.post("/reviews/get-user-reviews", async (req, res) => {
    console.log(req);
    try {
        const users = await Reviews.find({ bu_email: req.body.bu_email }).sort({
            date: -1,
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// get a review by id
router.get("/reviews/get-review/:id", async (req, res) => {
    console.log(req);
    const id = req.params.id;
    try {
        const review = await Reviews.findById(id);
        console.log(review);
        return res.status(200).json(review);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// update a review by id
router.put("/reviews/edit-review/:id", async (req, res) => {
    try {
        const result = await Reviews.findByIdAndUpdate(req.params.id, {
            user: req.body.user,
            bu_email: req.body.bu_email,
            anon: req.body.anon,
            course_id: req.body.id,
            professor: req.body.professor.value,
            subject: req.body.subject,
            usefulness: req.body.usefulness.value,
            difficulty: req.body.difficulty.value,
            rating: req.body.rating.value,
            review: req.body.review,
            date: req.body.date,
        });

        if (!result) {
            return res.status(404).json({ message: "Review not found" });
        }
        return res.status(200).send({ message: "Review updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// delete a review by id
router.delete("/reviews/delete-review/:id", async (request, response) => {
    try {
        await Reviews.findByIdAndDelete(request.params.id);
        return response
            .status(200)
            .send({ message: "Review deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
