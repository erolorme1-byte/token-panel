const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;

// ====== Çoklu havuz listesi ======
const pools = [
  {
    pairAddress: "0x47dec6c1bc6fa8bc1820d7e9e6d3229bff5b05ce",
    chainId: "bsc"
  },
  {
    pairAddress: "0x198bfed75c3dae023f076961e973f5cc5709cbe6",
    chainId: "bsc"
  },
  {
    pairAddress: "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee89414e",
    chainId: "bsc"
  },
  {
    pairAddress: "0x6ee4eee6f2a7e35960adb521442521bee5f0aa1e",
    chainId: "bsc"
  }
];

// ====== Havuz verilerini API'dan çek ======
async function fetchPoolData(pool) {
  try {
    const url = `https://api.dexscreener.com/latest/dex/pairs/${pool.chainId}/${pool.pairAddress}`;
    const response = await axios.get(url);

    if (response.data && response.data.pairs && response.data.pairs.length > 0) {
      return response.data.pairs[0]; // Havuzun kendisi
    }

    return { error: "Data not found", pairAddress: pool.pairAddress };
  } catch (err) {
    return { error: err.message, pairAddress: pool.pairAddress };
  }
}

// ====== API endpoint: /api/pools ======
app.get("/api/pools", async (req, res) => {
  try {
    const results = await Promise.all(pools.map(fetchPoolData));
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ====== Sunucu ======
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
