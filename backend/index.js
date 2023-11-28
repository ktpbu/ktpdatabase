import express from "express";
import { PORT } from "./config.js"; // ideally import PORT from .env file

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
