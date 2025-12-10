const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/pools", require("./routes/pools"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/token", require("./routes/token"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor ✔️");
});

// PORT AYARI
const PORT = process.env.PORT || 5000;

// SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
