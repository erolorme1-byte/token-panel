require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(cors())

const CONTRACT = "0x70f9C0d8e346AD960780e299238F8c49c896704C"
const BSCSCAN_API_KEY = "DM8MS6Y6H52F86XYA4WTK8UQDF9IU7U6M3"

app.get("/", (req, res) => {
  res.send("Token API OK 🚀")
})

app.get("/api/token", async (req, res) => {
  try {
    // Token info
    const tokenInfo = await axios.get(
      "https://api.bscscan.com/api",
      {
        params: {
          module: "token",
          action: "tokeninfo",
          contractaddress: CONTRACT,
          apikey: BSCSCAN_API_KEY
        }
      }
    )

    if (!tokenInfo.data.result || !tokenInfo.data.result[0]) {
      return res.status(404).json({ error: "Token not found" })
    }

    const t = tokenInfo.data.result[0]

    res.json({
      name: t.tokenName,
      symbol: t.symbol,
      decimals: Number(t.divisor),
      totalSupply: t.totalSupply,
      contract: CONTRACT,
      network: "BSC",
      source: "bscscan"
    })
  } catch (err) {
    res.status(500).json({ error: "BSCScan API error" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running 👉 http://localhost:${PORT}`)
})
