const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const initDb = require("./config/initDb");
const uploadRoute = require("./routes/uploadRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const violationRoute = require("./routes/violationRoute");
const exportRoute = require("./routes/exportRoute");
const searchRoute = require("./routes/searchRoute");
const authRoute = require("./routes/authRoute");
const authenticate = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Test DB connection
const db = require("./config/db");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/upload", uploadRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/violations", violationRoute);
app.use("/api/export", exportRoute);
app.use("/api/search", searchRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});

// SOCKET.IO SETUp
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ WebSocket client disconnected:", socket.id);
  });
});

// Attach io to app (so we can use it in controllers)
app.set("io", io);

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

// Optional: Test DB query
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Server running on port ${PORT}`);
});
