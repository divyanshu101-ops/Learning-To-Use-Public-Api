import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("weather", { weather: null, city: null, error: null });
});

router.post("/", async (req, res) => {
  const { city } = req.body;
  try {
    // Step 1: Get coordinates from city name
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    );

    if (geoRes.data.length === 0) {
      return res.render("weather", { weather: null, city, error: "City not found!" });
    }

    const { lat, lon } = geoRes.data[0];

    // Step 2: Get forecast using coordinates
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    // Step 3: Filter tomorrow's data
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    const tomorrowForecasts = weatherRes.data.list.filter((item) =>
      item.dt_txt.startsWith(tomorrowDate)
    );

    const willRain = tomorrowForecasts.some((item) =>
      item.weather[0].main.toLowerCase().includes("rain")
    );

    const description = tomorrowForecasts[0]?.weather[0]?.description || "N/A";
    const temp = tomorrowForecasts[0]?.main?.temp || "N/A";

    res.render("weather", {
      weather: { willRain, description, temp },
      city,
      error: null,
    });
  } catch (err) {
    res.render("weather", { weather: null, city, error: "Something went wrong!" });
  }
});

export default router;