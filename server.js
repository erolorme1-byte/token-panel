require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Sabit token bilgileri
const tokenData = {
  name: "crypto",
  symbol: "USDT",
  decimals: 6,
  totalSupply: "116999999999"
};

// Token API endpoint
app.get('/api/token', (req, res) => {
  res.json(tokenData);
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Token API OK 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
