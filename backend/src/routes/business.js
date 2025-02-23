import express from "express";
import prisma from "../utils/prismaClient.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 📌 Ensure Uploads Directory Exists
const UPLOADS_DIR = "uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
// 📌 User Contacts a Business
router.post("/contact/:businessId", authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;
        const { businessId } = req.params;
        const userId = req.user.userId; // Get logged-in user from middleware
        console.log(userId)
        // Check if the business exists
        const business = await prisma.business.findUnique({ where: { id: businessId } });
        if (!business) return res.status(404).json({ error: "Business not found" });

        // Create contact request entry
        const contactRequest = await prisma.contactRequest.create({
            data: {
                userId,
                businessId,
                message,
            },
        });

        res.status(201).json({ message: "Contact request sent", contactRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/contacts/:businessId", authMiddleware, async (req, res) => {
    try {
        console.log(req.user);
        
        const business = await prisma.business.findFirst({ where: { ownerId: req.user.userId } });

        const contacts = await prisma.contactRequest.findMany({
            where: { businessId: business.id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        console.log("Contacts found:", contacts);

        // Transform response to include name, email, and message
        const formattedContacts = contacts.map(contact => ({
            name: contact.user.name,
            email: contact.user.email,
            message: contact.message
        }));

        res.json(formattedContacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// 📌 Add a Business with Image
router.post("/add",authMiddleware , upload.single("image"), async (req, res) => {
    try {
        const { name, category, description, location, businessEmail, contact } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !category || !description || !location || !businessEmail || !contact) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBusiness = await prisma.business.create({
            data: { 
                name, 
                category, 
                description, 
                location, 
                businessEmail, 
                contact, 
                imageUrl, 
                ownerId: req.user.userId // Correctly reference ownerId
            },   
        });

        res.status(201).json(newBusiness);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// 📌 Get All Businesses
router.get("/all", async (req, res) => {
    try {
        const businesses = await prisma.business.findMany();

        // Ensure image URLs are complete
        const updatedBusinesses = businesses.map((business) => ({
            ...business,
            imageUrl: business.imageUrl ? `${process.env.BASE_URL}${business.imageUrl}` : null,
        }));

        res.json(updatedBusinesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Search Businesses
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Query parameter is required" });

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

export default router;
