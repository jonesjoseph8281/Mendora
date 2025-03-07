import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import businessRoutes from "./routes/business.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



// Routes
app.use("/api/business", businessRoutes);
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
