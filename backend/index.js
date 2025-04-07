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

app.use(
    cors({
        origin: [
            "https://www.database.ktpbostonu.com",
            "http://localhost:5173",
        ],
    })
);

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

const connectionOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

async function connectDatabasesAndStartServer() {
    try {
        await mongoose.connect(process.env.MONGODBURI, connectionOptions);
        console.log("Connected to MongoDB");
        mongoose.connection.on("error", (error) => {
            console.log("Error connecting to MongoDB:", error);
        });

        const membersMongoDB = await mongoose
            .createConnection(process.env.MONGODBURI_MEMBERS, connectionOptions)
            .asPromise();
        console.log("Connected to Members MongoDB");
        membersMongoDB.on("error", (error) => {
            console.log("Error connecting to Members MongoDB:", error);
        });

        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    } catch (error) {
        console.log("Error connecting to databases:", error);
        process.exit(1);
    }
}

connectDatabasesAndStartServer();

export default app;
