import express from "express";
import prisma from "../utils/prismaClient.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// 📌 Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// 📌 Add a Business with Image
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { name, category, description, location, businessEmail, contact } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !category || !description || !location || !businessEmail || !contact) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBusiness = await prisma.business.create({
            data: { name, category, description, location, businessEmail, contact, imageUrl },
        });

        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Get All Businesses
router.get("/all", async (req, res) => {
    try {
        const businesses = await prisma.business.findMany();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Search Businesses
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const businesses = await prisma.business.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } },
                ],
            },
        });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Get Nearby Businesses (SQL Query)
router.get("/nearby", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        if (!lat || !lng) return res.status(400).json({ error: "Latitude and longitude are required" });

        const businesses = await prisma.$queryRaw`
            SELECT *, 
                (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance 
            FROM "Business"
            HAVING distance < 5
            ORDER BY distance;
        `;
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Add a Review
router.post("/review/:businessId", authMiddleware, async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const business = await prisma.business.findUnique({ where: { id: req.params.businessId } });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const newReview = await prisma.review.create({
            data: {
                userId: req.user.userId,
                businessId: req.params.businessId,
                rating,
                comment,
            },
        });

        res.json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Register a Business (Alternative)
router.post("/register", upload.single("image"), async (req, res) => {
    try {
        const { name, service, location, phone, email, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newBusiness = await prisma.business.create({
            data: { name, service, location, phone, email, description, imageUrl },
        });

        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
