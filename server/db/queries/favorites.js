import db from "../client.js";

// Get all favorites by user, newest first
export async function getFavoritesByUserId(userId) {
    const sql = `
        SELECT activities .*, favorites.created_at
        FROM favorites
        JOIN activities ON activities.id = favorites.activity_id
        WHERE favorites.user_id = $1
        ORDER BY favorites.created_at DESC
        `;
        
        const { rows: favorites } = await db.query(sql, [userId]);
        return favorites;
}

// Add a new favorite by user
export async function addFavorite(userId, activityId) {
    const sql = `
    INSERT INTO favorites
    (user_id, activity_id)
    VALUES
    ($1, $2)
    RETURNING *
    `;

    const {
        rows: [favorite],
    } = await db.query(sql, [userId, activityId]);
    return favorite;
} 

// Remove a favorite by user
export async function removeFavorite(userId, activityId) {
    const sql = `
    DELETE FROM favorites
    WHERE user_id = $1 AND activity_id = $2
    RETURNING *
    `;

    const {
        rows: [deleted],
    } = await db.query(sql, [userId, activityId]);
    return deleted;
}