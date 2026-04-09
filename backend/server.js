const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

// 🔥 Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

// 🔥 Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

// Routes
app.use("/api/auth", authRoutes)

// 🔥 IMPORTANT: dynamic port for Render
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})