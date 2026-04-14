const pool = require("../config/db");

const DEFAULT_USER_ID = 1; // No auth — always use this user

// GET /api/cart — get all cart items for default user
const getCart = async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT ci.id, ci.quantity, ci.product_id,
              p.name, p.price, p.original_price, p.stock,
              (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS image
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [DEFAULT_USER_ID]
    );
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart — add item to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    // If item already in cart, increase quantity
    await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
      [DEFAULT_USER_ID, product_id, quantity, quantity]
    );

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/cart/:id — update quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    await pool.query(
      `UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?`,
      [quantity, id, DEFAULT_USER_ID]
    );

    res.json({ success: true, message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/cart/:id — remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM cart_items WHERE id = ? AND user_id = ?`,
      [id, DEFAULT_USER_ID]
    );

    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
