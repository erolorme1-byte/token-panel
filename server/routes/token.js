const express = require("express");
const router = express.Router();
const axios = require("axios");

// Token bilgilerini dönen API
router.get("/", async (req, res) => {
  try {
    // Örnek token bilgisi
    const data = {
      name: "MyToken",
      symbol: "MYT",
      priceUSD: 0.00123,
      liquidity: 5230,
      marketCap: 154000,
      volume24h: 10230
    };

    return res.json(data);
  } catch (err) {
    console.error("Token API hatası:", err);
    res.status(500).json({ error: "Token verisi alınırken hata oluştu" });
  }
});

module.exports = router;
