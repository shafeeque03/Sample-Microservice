import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shopmanagement:shopSA100@cluster0.wds69.mongodb.net/ms-user-service";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for User Service");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process on failure
  }
};

connectDB();

// Routes
app.use("/api/users", userRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "User service is up and running!" });
});

// Handle process termination gracefully
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  await mongoose.connection.close();
  console.log("✅ MongoDB connection closed.");
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Rejection:", err);
  process.exit(1);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 User service running on port ${PORT}`);
});
