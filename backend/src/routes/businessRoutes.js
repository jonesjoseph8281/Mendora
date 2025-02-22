import express from "express";
import Business from "../../models/Business.js";
import authMiddleware from "./middleware/auth.js";

const router = express.Router();


router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { name, category, description, coordinates } = req.body;
        const newBusiness = new Business({
            name,
            category,
            description,
            owner: req.user.userId,
            location: { type: "Point", coordinates }
        });
        await newBusiness.save();
        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const businesses = await Business.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/nearby", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const businesses = await Business.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 5000 // 5km radius
                }
            }
        });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/review/:businessId", authMiddleware, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const business = await Business.findById(req.params.businessId);
        if (!business) return res.status(404).json({ message: "Business not found" });

        business.reviews.push({ user: req.user.userId, rating, comment });
        await business.save();
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
