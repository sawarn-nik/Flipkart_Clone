const express = require("express");
const router = express.Router();
const { placeOrder, getOrders, getOrderById, cancelOrder } = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/cancel", cancelOrder);

module.exports = router;
