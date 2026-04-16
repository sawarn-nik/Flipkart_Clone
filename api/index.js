const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/products", require("../backend/routes/productRoutes"));
app.use("/api/cart", require("../backend/routes/cartRoutes"));
app.use("/api/orders", require("../backend/routes/orderRoutes"));
app.use("/api/wishlist", require("../backend/routes/wishlistRoutes"));

app.get("/api", (req, res) => res.json({ message: "Flipkart Clone API running" }));

module.exports = app;
