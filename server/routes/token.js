const express = require("express");
const axios = require("axios");
const router = express.Router();

// /api/token/:address
router.get("/:address", async (req, res) => {
  try {
    const tokenAddress = req.params.address.toLowerCase();

    const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
    const resp = await axios.get(url);

    if (!resp.data || !resp.data.pairs || resp.data.pairs.length === 0) {
      return res.status(404).json({ error: "Token pair not found" });
    }

    const pair = resp.data.pairs[0]; // ilk pair bilgisi

    res.json({
      address: tokenAddress,
      chainId: pair.chainId,
      dexId: pair.dexId,
      pairAddress: pair.pairAddress,

      priceUsd: pair.priceUsd,
      priceNative: pair.priceNative,

      liquidityUsd: pair.liquidity?.usd,
      liquidityBase: pair.liquidity?.base,
      liquidityQuote: pair.liquidity?.quote,

      volume24h: pair.volume?.h24,
      fdv: pair.fdv,
    });
  } catch (err) {
    console.error("TOKEN API ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
