const express = require("express");
const router = express.Router();
const StaffAvailability = require("../models/StaffAvailability");
const auth = require("../middlewares/auth");

console.log("✅ staffAvailability routes loaded");

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can set availability" });
    }

    const { staffId, day, startTime, endTime } = req.body;

    const overlap = await StaffAvailability.findOne({
      staffId,
      day,
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    if (overlap) {
      return res
        .status(400)
        .json({ message: "This time slot overlaps with existing availability" });
    }

    const entry = new StaffAvailability({ staffId, day, startTime, endTime });
    await entry.save();

    res.json({ message: "Availability saved", entry });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    console.log("🔥 PUT availability hit:", req.params.id);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can edit availability" });
    }

    const { staffId, day, startTime, endTime } = req.body;

    const overlap = await StaffAvailability.findOne({
      staffId,
      day,
      _id: { $ne: req.params.id },
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    if (overlap) {
      return res
        .status(400)
        .json({ message: "Updated time overlaps with another slot" });
    }

    const updated = await StaffAvailability.findByIdAndUpdate(
      req.params.id,
      { day, startTime, endTime },
      { new: true }
    );

    res.json({ message: "Availability updated", updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can delete availability" });
    }

    await StaffAvailability.findByIdAndDelete(req.params.id);
    res.json({ message: "Availability deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:staffId", async (req, res) => {
  try {
    const list = await StaffAvailability.find({
      staffId: req.params.staffId,
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;