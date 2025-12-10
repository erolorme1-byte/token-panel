const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const axios = require("axios");

const tokenRoute = require("./routes/token");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ ANA SAYFA (Cannot GET / hatasını çözer)
app.get("/", (req, res) => {
  res.send("Backend çalışıyor ✔️");
});

// ==== DEXSCREENER MULTI-CHAIN POOL FETCHER ====

const POOLS = [
  { pair: "0x47dec6c1bc6fa8bc1820d7e9e6d3229bff5b05ce", chain: "bsc" },       // PancakeSwap
  { pair: "0x198bfed75c3dae023f076961e973f5cc5709cbe6", chain: "bsc" },      // SquadSwap
  { pair: "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee89414e", chain: "bsc" }, // Uniswap
  { pair: "0x6ee4eee6f2a7e35960adb521442521bee5f0aa1e", chain: "bsc" },      // Uniswap
  { pair: "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee8", chain: "bsc" } // Uniswap
];

// Cache verisi buraya kaydedilecek
let cachedPools = [];
let lastUpdate = null;

// DEX verilerini çeken fonksiyon
async function updatePoolData() {
  try {
    console.log("🌐 Havuz verileri güncelleniyor...");

    const results = [];

    for (const p of POOLS) {
      const url = `https://api.dexscreener.com/latest/dex/pairs/${p.chain}/${p.pair}`;
      const resp = await axios.get(url);

      if (resp.data && resp.data.pair) {
        results.push(resp.data.pair);
      }
    }

    cachedPools = results;
    lastUpdate = new Date();

    console.log("✔️ Havuz verileri güncellendi:", lastUpdate.toLocaleString());

  } catch (err) {
    console.error("Havuz verisi güncelleme hatası:", err.toString());
  }
}

// İlk veri çekiş
updatePoolData();

// ⏰ Her 60 saniyede bir otomatik güncelle
setInterval(updatePoolData, 60000);

// API endpoint (bu frontend tarafından çağrılır)
app.get("/api/pools", (req, res) => {
  res.json({
    updatedAt: lastUpdate,
    pools: cachedPools,
  });
});

// === TOKEN ROUTE ===
app.use("/api/token", tokenRoute);

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
