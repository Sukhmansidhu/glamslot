const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Booking = require("../models/Booking");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({ message: "You can review only completed bookings" });
    }

    const existing = await Review.findOne({ bookingId });
    if (existing) {
      return res.status(400).json({ message: "Review already exists" });
    }

    const review = new Review({
      userId: req.user.id,
      bookingId,
      serviceId: booking.serviceId,
      staffId: booking.staffId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/staff/:staffId", async (req, res) => {
  try {
    const { staffId } = req.params;

    if (!staffId || staffId === "undefined") {
      return res.json([]);
    }

    const reviews = await Review.find({ staffId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/service/:serviceId", async (req, res) => {
  const reviews = await Review.find({ serviceId: req.params.serviceId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
});

router.get("/staff/:staffId/summary", async (req, res) => {
  try {
    const reviews = await Review.find({ staffId: req.params.staffId });

    if (reviews.length === 0) {
      return res.json({ averageRating: 0, totalReviews: 0 });
    }

    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    res.json({
      averageRating: Number(avg.toFixed(1)),
      totalReviews: reviews.length,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const booking = await Booking.findById(review.bookingId);
    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Cannot edit review before completion" });
    }

    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();

    res.json({ message: "Review updated", review });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const booking = await Booking.findById(review.bookingId);

    if (
      review.userId.toString() === req.user.id &&
      booking.status !== "completed"
    ) {
      return res
        .status(400)
        .json({ message: "Cannot delete review before completion" });
    }

    if (
      review.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;