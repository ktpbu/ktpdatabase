import express from "express";
import "./config.js";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
});

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Backend for KTP Database");
});

app.get("/home", (req, res) => {
    console.log(req);
    res.status(234).send("Home for KTP Database");
});

import academicRoutes from "./routes/academicRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";

app.use("/academics", academicRoutes);
app.use("/calendar", calendarRoutes);
app.use("/professional", professionalRoutes);
