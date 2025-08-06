import express from "express";
const router = express.Router();
export default router;

import { getAllActivities, getActivityById } from "../db/queries/activities.js";
import { getUsersByActivityId } from "../db/queries/users.js";
import requireUser from "#middleware/requireUser";

// Get all activities from db
router.route("/").get(async (req, res) => {
    const activities = await getAllActivities();
    res.send(activities);
});

// Get activity by ID and attach to request
router.param("id", async (req, res, next, id) => {
    const activity = await getActivityById(id);
    if (!activity) return res.status(404).send("Activity not found.");
    req.activity = activity;
    next();
});

// Send activity info
router.route("/:id").get((req, res) => {
    res.send(req.activity);
});

// Get users by activity ID when logged in
router.route("/:id/users").get(requireUser, async (req, res) => {
    const users = await getUsersByActivityId(req.activity.id);
    res.send(users);
});