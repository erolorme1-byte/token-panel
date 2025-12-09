const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const tokenRoute = require("./routes/token");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// === ROUTES ===
app.use("/api/token", tokenRoute);

// ROOT CHECK
app.get("/", (req, res) => {
  res.send("Backend çalışıyor ✔️");
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
