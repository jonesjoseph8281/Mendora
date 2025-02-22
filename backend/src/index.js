import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import businessRoutes from "./routes/businessRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/business", businessRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
