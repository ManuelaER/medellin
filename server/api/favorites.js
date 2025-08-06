import express from "express";
const router = express.Router();
export default router;
import {
    addFavorite,
    getFavoritesByUserId,
    removeFavorite,
} from "../db/queries/favorites.js";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

// Check if user is logged in for all routes
router.use(requireUser);

// Get all favorites for the logged in user
router.get("/", async (req, res, next) => {
    try {
        const favorites = await getFavoritesByUserId(req.user.id);
        res.send(favorites);
    } catch (e) {
        next(e);
    }
});

// Add a new favorite activity
router.post("/", requireBody(["activityId"]), async (req, res, next) => {
    try {
        const { activityId } = req.body;
        const favorite = await addFavorite(req.user.id, activityId);
        res.status(201).send(favorite);
    } catch (e) {
        next(e);
    }
});

// Remove a favorite activity
router.delete("/:activityId", async (req, res, next) => {
    try {
        const { activityId } = req.params;
        const removed = await removeFavorite(req.user.id, activityId);
        res.send(removed); 
    } catch (e) {
        next(e);
    }
})