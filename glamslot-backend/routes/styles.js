const express = require("express");
const router = express.Router();
const Style = require("../models/Style");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  const style = new Style(req.body);
  await style.save();
  res.status(201).json(style);
});

router.get("/", async (req, res) => {
  const styles = await Style.find().sort({ createdAt: -1 });
  res.json(styles);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  await Style.findByIdAndDelete(req.params.id);
  res.json({ message: "Style deleted" });
});

module.exports = router;