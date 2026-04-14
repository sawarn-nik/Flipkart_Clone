const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const DEFAULT_USER_ID = 1;

// POST /api/orders — place an order
const placeOrder = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // Use transaction so everything succeeds or nothing does

    const { shipping } = req.body;
    const { name, phone, address, city, state, pincode } = shipping;

    // Get cart items
    const [cartItems] = await conn.query(
      `SELECT ci.quantity, ci.product_id,
              p.name AS product_name, p.price, p.stock,
              (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS image
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [DEFAULT_USER_ID]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Check stock availability
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product_name}`,
        });
      }
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order
    const orderId = uuidv4();
    await conn.query(
      `INSERT INTO orders (id, user_id, total_amount, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, DEFAULT_USER_ID, total, name, phone, address, city, state, pincode]
    );

    // Insert order items and reduce stock
    for (const item of cartItems) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.product_name, item.image, item.price, item.quantity]
      );

      // Reduce stock
      await conn.query(
        `UPDATE products SET stock = stock - ? WHERE id = ?`,
        [item.quantity, item.product_id]
      );
    }

    // Clear cart after order
    await conn.query(`DELETE FROM cart_items WHERE user_id = ?`, [DEFAULT_USER_ID]);

    await conn.commit();

    res.json({ success: true, data: { orderId, total, itemCount: cartItems.length } });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
};

// GET /api/orders — order history
const getOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.*, 
        (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS item_count
       FROM orders o
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [DEFAULT_USER_ID]
    );

    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders/:id — single order details
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[order]] = await pool.query(
      `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
      [id, DEFAULT_USER_ID]
    );

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const [items] = await pool.query(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [id]
    );

    res.json({ success: true, data: { ...order, items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { placeOrder, getOrders, getOrderById };
