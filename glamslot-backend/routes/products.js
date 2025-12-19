const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

router.get("/", async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;