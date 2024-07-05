import admin from "../firebase.js";
import express from "express";
import { Users } from "../models/userModel.js";

const router = express.Router();

async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return res.status(401).send("token is required");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("token verification failed");
    }
}

router.post("/protected", verifyToken, async (req, res) => {
    const email = req.user.email;
    let user = await Users.findOne({ bu_email: email });
    if (!user) {
        console.log("no user");
        return res.status(401).send("user not authorized");
    }
    res.send(user);
});

export default router;
