const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find().populate("services");
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("services");
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post(
  "/",
  auth,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
      }

      const staff = new Staff({
        restaurantName: req.body.restaurantName,
        name: req.body.name,
        phone: req.body.phone,
        description: req.body.description,
        fees: Number(req.body.fees),
        skills: req.body.skills ? req.body.skills.split(",") : [],
        services: req.body.services
          ? Array.isArray(req.body.services)
            ? req.body.services
            : [req.body.services]
          : [],
        isAvailable: req.body.isAvailable !== "false",
        isOnLeave: req.body.isOnLeave === "true",
        photo: req.file ? req.file.path : "",
      });

      await staff.save();
      res.status(201).json({ message: "Staff added", staff });
    } catch (err) {
      console.error("ADD STAFF ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  }
);


router.put(
  "/:id",
  auth,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
      }

      const updateData = {
        restaurantName: req.body.restaurantName,
        name: req.body.name,
        phone: req.body.phone,
        description: req.body.description,
        fees: Number(req.body.fees),
        skills: req.body.skills ? req.body.skills.split(",") : [],
        services: req.body.services
          ? Array.isArray(req.body.services)
            ? req.body.services
            : [req.body.services]
          : [],
        isAvailable: req.body.isAvailable !== "false",
        isOnLeave: req.body.isOnLeave === "true",
      };

      if (req.file) updateData.photo = req.file.path;

      const updated = await Staff.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({ message: "Staff updated", updated });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;