const express = require("express");
const router = express.Router();
const Salon = require("../models/Salon");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const salon = new Salon(req.body);
    await salon.save();
    res.status(201).json(salon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const salons = await Salon.find({ isActive: true });
  res.json(salons);
});

router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const salon = await Salon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(salon);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  await Salon.findByIdAndDelete(req.params.id);
  res.json({ message: "Salon deleted" });
});

module.exports = router;