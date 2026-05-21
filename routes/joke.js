import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("joke", { joke: null, name: null, reason: null });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
    const categoryIndex = name.charCodeAt(0) % categories.length;
    const category = categories[categoryIndex];

    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
    const data = response.data;

    const reason = `Because your name "${name}" starts with "${name[0].toUpperCase()}", we picked a "${category}" joke for you!`;

    res.render("joke", { joke: data, name, reason });
  } catch (err) {
    res.render("joke", { joke: null, name: null, reason: null });
  }
});

export default router;