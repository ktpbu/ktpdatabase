import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173",
        failureRedirect: "http://localhost:5173",
    })
);

router.get("/google/login/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "user login", user: req.user });
    } else {
        res.status(400).json({ message: "user not authorized" });
    }
});

router.get("/google/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173");
    });
});

export default router;
