require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const currency = require("./modules/api/currency");
const places = require("./modules/api/places");
const timezone = require("./modules/api/timezone");
const authRoutes = require("./routes/authRoutes");
const Task = require("./models/Task");
const User = require("./models/User");
const Workspace = require("./models/Workspace");
const CurrencyConversion = require("./models/CurrencyConversion");

const app = express();
const port = process.env.PORT || 8888;
const mongoURI = process.env.MONGODB_URI;

// Setup Pug as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Setup MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Enable CORS
app.use(
  cors({
    origin: [
      "https://freelancer-toolkit-frontend-react.vercel.app", // Vercel Frontend
      "http://localhost:5173", // Localhost Frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth Routes
app.use(authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("index", { title: "Freelancer Toolkit" });
});

// Additional Routes (Tasks, Users, Workspaces, Currency Conversion) - Unchanged

// Start Server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
