const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const Staff = require("../models/Staff");
const auth = require("../middlewares/auth");

router.get("/dashboard", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const bookings = await Booking.find({
      status: { $in: ["confirmed", "completed"] },
    }).populate("staffId");

    const totalBookings = bookings.length;

    let totalRevenue = 0;
    let peakRevenue = 0;

    bookings.forEach((b) => {
      totalRevenue += b.finalPrice || 0;
      if (b.finalPrice && b.finalPrice > 200) {
        peakRevenue += b.finalPrice;
      }
    });

    const staffMap = {};

    bookings.forEach((b) => {
      if (!b.staffId) return;

      const id = b.staffId._id.toString();

      if (!staffMap[id]) {
        staffMap[id] = {
          staffName: b.staffId.name,
          earnings: 0,
          bookings: 0,
        };
      }

      staffMap[id].earnings += b.finalPrice || 0;
      staffMap[id].bookings += 1;
    });

    const staffEarnings = Object.values(staffMap);

    const reviews = await Review.find();

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1);

    res.json({
      totalBookings,
      totalRevenue,
      peakRevenue,
      staffEarnings,
      totalReviews,
      averageRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;