const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.BSCSCAN_API_KEY;
const TOKEN = process.env.TOKEN_ADDRESS;

// Total supply endpoint
router.get("/supply", async (req, res) => {
  try {
    const url = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${TOKEN}&apikey=${API_KEY}`;
    const response = await axios.get(url);

    return res.json({
      supply: response.data.result
    });

  } catch (err) {
    console.error("Supply Hatası:", err);
    return res.status(500).json({ message: "Supply alınamadı" });
  }
});

module.exports = router;
