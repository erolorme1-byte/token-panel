const express = require("express");
const axios = require("axios");
const router = express.Router();

const POOLS = [
  "0x47dec6c1bc6fa8bc1820d7e9e6d3229bff5b05ce", // pancakeswap
  "0x198bfed75c3dae023f076961e973f5cc5709cbe6", // squadSwap
  "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee89414e", // UniSwap
  "0x6ee4eee6f2a7e35960adb521442521bee5f0aa1e", // uniswap BSC
  "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee8" // Uniswap BSC
];

router.get("/", async (req, res) => {
  try {
    const results = [];

    for (const pool of POOLS) {
      const url = `https://api.dexscreener.com/latest/dex/pairs/bsc/${pool}`;
      const resp = await axios.get(url);

      if (resp.data && resp.data.pair) {
        results.push(resp.data.pair);
      }
    }

    return res.json(results);
  } catch (err) {
    console.error("POOLS ERROR:", err.toString());
    return res.status(500).json({ error: "Failed to load pools" });
  }
});

module.exports = router;
