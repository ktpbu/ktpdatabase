import express from "express";
import "./config.js";
import cors from "cors";
import mongoose from "mongoose";

import academicRoutes from "./routes/academicRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";

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
app.use("/calendar", calendarRoutes);
app.use("/professional", professionalRoutes);

mongoose
    .connect(process.env.mongoDBURI)
    .then(() => {
        console.log("App connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;
