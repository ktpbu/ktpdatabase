import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import mongoose from "mongoose";

import "./config.js";

import supabase from "./supabaseClient.js";
import { Users } from "./models/userModel.js";

import academicRoutes from "./routes/academicRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";

const port = 3000;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await Users.findOne({
                    bu_email: profile.emails[0].value,
                });
                if (!user) {
                    console.log("user not authorized");
                    return done(null, false, {
                        message: "user not authorized",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Backend for KTP Database");
});

app.get("/home", (req, res) => {
    console.log(req);
    res.status(234).send("Home for KTP Database");
});

app.use("/academics", academicRoutes);
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);
app.use("/professional", professionalRoutes);

mongoose
    .connect(process.env.MONGODBURI)
    .then(() => {
        console.log("App is connected to MongoDB");
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;
