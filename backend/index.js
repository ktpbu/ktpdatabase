import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import "./config.js";

import supabase from "./supabaseClient.js";

import academicRoutes from "./routes/academicRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";

const port = 3000;

const app = express();
app.use(express.json());

app.use(cors());

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

async function connectDatabasesAndStartServer() {
    try {
        const db1 = await mongoose.createConnection(process.env.MONGODBURI);

        const db2 = await mongoose.createConnection(
            process.env.MONGODBURI_MEMBERS
        );

        db1.on("connected", () => {
            console.log("Connected to database 1");
        });

        db1.on("error", (error) => {
            console.log("Error connecting to database 1:", error);
        });

        db2.on("connected", () => {
            console.log("Connected to database 2");
        });

        db2.on("error", (error) => {
            console.log("Error connecting to database 2:", error);
        });

        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    } catch (error) {
        console.log("Error connecting to databases:", error);
    }
}

connectDatabasesAndStartServer();

export default app;
