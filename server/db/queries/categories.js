import db from "../client.js";

// Get all categories
export async function getAllCategories() {
    const { rows } = await db.query(`SELECT * FROM categories`);

    return rows;
}

// Get a single category by ID
export async function getCategoryById(id) {
    const { rows } = await db.query(`SELECT * FROM categories WHERE id = $1;`, [id]);

    return rows[0];
}