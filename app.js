import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import indexRouter from "./routes/home.js";
import jokeRouter from "./routes/joke.js";
import weatherRouter from "./routes/weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/joke", jokeRouter);
app.use("/weather", weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});