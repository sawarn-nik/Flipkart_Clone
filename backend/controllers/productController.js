const pool = require("../config/db");

// GET /api/products — list all products with optional search & category filter
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = `
      SELECT p.*, c.name AS category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND (p.name LIKE ? OR p.brand LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ` AND c.name = ?`;
      params.push(category);
    }

    query += ` ORDER BY p.created_at DESC`;

    const [products] = await pool.query(query, params);
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/:id — single product with images and specs
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[product]] = await pool.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const [images] = await pool.query(
      `SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC`,
      [id]
    );

    const [specs] = await pool.query(
      `SELECT spec_key, spec_value FROM product_specs WHERE product_id = ?`,
      [id]
    );

    res.json({ success: true, data: { ...product, images, specs } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/categories — all categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(`SELECT * FROM categories ORDER BY name`);
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProducts, getProductById, getCategories };
