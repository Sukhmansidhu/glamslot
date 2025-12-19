const express = require("express");
const router = express.Router();
const RestaurantHoliday = require("../models/RestaurantHoliday");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const { date, reason } = req.body;

    const holiday = new RestaurantHoliday({ date, reason });
    await holiday.save();

    res.json({ message: "Holiday added", holiday });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const holidays = await RestaurantHoliday.find().sort({ date: 1 });
  res.json(holidays);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  await RestaurantHoliday.findByIdAndDelete(req.params.id);
  res.json({ message: "Holiday removed" });
});

module.exports = router;