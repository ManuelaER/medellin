import express from "express";
const router = express.Router();
export default router;
import { getAllCategories, getCategoryById } from "../db/queries/categories.js";

// Get all categories from db
router.get("/", async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
    } catch (e) {
        next(e);
    }
});

// Get a single category by ID
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        if (!category) return res.status(404).send("Category not found.");
        res.send(category);
    } catch (e) {
        next(e);
    }
});