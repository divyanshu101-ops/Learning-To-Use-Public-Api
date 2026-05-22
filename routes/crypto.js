import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", (req, res) =>{
    res.render("crypto",{crypto : null, symbol: null, error: null});
});

router.post("/",async (req, res) => {
    const { symbol } = req.body;
    try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}USDT`);

        const data = response.data;

        const crypto = {
            currentPrice : data.lastPrice,
            high : data.highPrice,
            low : data.lowPrice,
            change : data.priceChangePercent,
            volume : data.volume,
        };

        res.render("crypto", {crypto, symbol : symbol.toUpperCase(), error: null});
    } catch (error) {
        res.render("crypto", {crypto : null, symbol : null, error : "Wrong Crypto Symbol"});
    }
})

export default router;