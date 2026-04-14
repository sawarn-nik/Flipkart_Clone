const pool = require("../config/db");

const DEFAULT_USER_ID = 1;

// GET /api/wishlist
const getWishlist = async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT w.id, w.product_id, p.name, p.price, p.original_price, p.rating,
              (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS image
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?`,
      [DEFAULT_USER_ID]
    );
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/wishlist
const addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    await pool.query(
      `INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)`,
      [DEFAULT_USER_ID, product_id]
    );
    res.json({ success: true, message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/wishlist/:productId
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    await pool.query(
      `DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`,
      [DEFAULT_USER_ID, productId]
    );
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
