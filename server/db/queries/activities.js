import db from "../client.js";

// Get all activities
export async function getAllActivities() {
    const { rows } = await db.query(`SELECT * FROM activities`);
    return rows;
}

// Get a single activity by ID
export async function getActivityById(id) {
    const { rows } = await db.query(`SELECT * FROM activities WHERE id = $1;`,
        [id]
    );
    return rows[0];
}
