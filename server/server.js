const express = require("express");
const cors = require("cors");
const path = require("path");

const tokenRoute = require("./routes/token");
const analyticsRoute = require("./routes/analytics");
const poolsRoute = require("./routes/pools"); // <-- YENİ EKLENEN

const app = express();
app.use(cors());
app.use(express.json());

// === ROUTES ===
app.use("/api/token", tokenRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/pools", poolsRoute); // <-- YENİ EKLENEN

// Basit test endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor ✔️");
});

// PORT AYARI (Render için zorunlu)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${POR
