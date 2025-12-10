const express = require("express");
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Buraya senin havuz adreslerini giriyoruz
const pools = [
  {
    name: "PancakeSwap BSC",
    address: "0x47dec6c1bc6fa8bc1820d7e9e6d3229bff5b05ce"
  },
  {
    name: "SquadSwap BSC",
    address: "0x198bfed75c3dae023f076961e973f5cc5709cbe6"
  },
  {
    name: "Uniswap BSC 1",
    address: "0x4d5ffd4a21fc0265e81da3dac67151a0a86b4859965df74833ba3f32ee89414e"
  },
  {
    name: "Uniswap BSC 2",
    address: "0x6ee4eee6f2a7e35960adb521442521bee5f0aa1e"
  }
];

async function getPoolData(pool) {
  try {
    const url = `https://api.dexscreener.com/latest/dex/pairs/bsc/${pool.address}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.pair) {
      return { name: pool.name, address: pool.address, error: "Veri yok" };
    }

    return {
      name: pool.name,
      address: pool.address,
      priceUsd: data.pair.priceUsd,
      volume24h: data.pair.volume?.h24,
      liquidityUsd: data.pair.liquidity?.usd,
    };
  } catch (e) {
    return { name: pool.name, address: pool.address, error: "API Hatası" };
  }
}

router.get("/", async (req, res) => {
  const results = await Promise.all(pools.map(getPoolData));
  res.json(results);
});

module.exports = router;
