const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Service = require("../models/Service");
const StaffAvailability = require("../models/StaffAvailability");
const Staff = require("../models/Staff");
const RestaurantHoliday = require("../models/RestaurantHoliday");
const User = require("../models/User");
const auth = require("../middlewares/auth");

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

const todayDate = () => new Date().toISOString().split("T")[0];
const currentMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

async function autoCompleteBookings() {
  const bookings = await Booking.find({ status: "confirmed" });

  for (const b of bookings) {
    const bookingEnd = toMinutes(b.endTime);

    if (
      b.date < todayDate() ||
      (b.date === todayDate() && bookingEnd < currentMinutes())
    ) {
      b.status = "completed";
      await b.save();
    }
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const {
      serviceId,
      staffId,
      date,
      startTime,
      notes,
      finalPrice,
      walletUsed = 0,
      giftCode = null,
    } = req.body;

    const holiday = await RestaurantHoliday.findOne({ date });
    if (holiday) {
      return res.status(400).json({ message: `Restaurant closed on ${date}` });
    }

    const staff = await Staff.findById(staffId);
    if (!staff || staff.isOnLeave || !staff.isAvailable) {
      return res.status(400).json({ message: "Staff not available" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const duration = service.durationMinutes;
    const start = toMinutes(startTime);
    const end = start + duration;
    const endTime = toTime(end);

    const existing = await Booking.find({
      staffId,
      date,
      status: { $in: ["pending", "confirmed"] },
    });

    const overlap = existing.some((b) => {
      const s = toMinutes(b.startTime);
      const e = toMinutes(b.endTime);
      return start < e && s < end;
    });

    if (overlap) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const user = await User.findById(req.user.id);

    if (walletUsed > 0) {
      if (user.walletBalance < walletUsed) {
        return res.status(400).json({ message: "Insufficient wallet balance" });
      }

      user.walletBalance -= walletUsed;
      await user.save();
    }

    const booking = new Booking({
      userId: req.user.id,
      serviceId,
      staffId,
      date,
      startTime,
      endTime,
      finalPrice,
      walletUsed,
      giftCode,
      status: "confirmed",
      notes,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
      walletBalance: user.walletBalance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status !== "confirmed") {
      return res.status(400).json({ message: "Booking cannot be cancelled" });
    }

    if (booking.walletUsed > 0) {
      const user = await User.findById(booking.userId);
      user.walletBalance += booking.walletUsed;
      await user.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled & wallet refunded",
      refundedAmount: booking.walletUsed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    await autoCompleteBookings();

    const bookings = await Booking.find({ userId: req.user.id })
      .populate("serviceId")
      .populate("staffId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    await autoCompleteBookings();

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("staffId", "name")
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/slots", async (req, res) => {
  try {
    const { serviceId, staffId, date } = req.query;

    if (!serviceId || !staffId || !date) {
      return res.json([]);
    }

    const holiday = await RestaurantHoliday.findOne({ date });
    if (holiday) return res.json([]);

    const service = await Service.findById(serviceId);
    const staff = await Staff.findById(staffId);

    if (!service || !staff || staff.isOnLeave || !staff.isAvailable) {
      return res.json([]);
    }

    const duration = service.durationMinutes;

    const [y, m, d] = date.split("-").map(Number);
    const dayName = new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availability = await StaffAvailability.findOne({
      staffId,
      day: dayName,
    });

    if (!availability) return res.json([]);

    const startDay = toMinutes(availability.startTime);
    const endDay = toMinutes(availability.endTime);

    const booked = await Booking.find({
      staffId,
      date,
      status: { $in: ["pending", "confirmed"] },
    });

    const bookedRanges = booked.map((b) => ({
      s: toMinutes(b.startTime),
      e: toMinutes(b.endTime),
    }));

    let start = startDay;
    const slots = [];

    while (start + duration <= endDay) {
      const end = start + duration;
      const overlap = bookedRanges.some(
        (b) => start < b.e && b.s < end
      );

      if (!overlap) {
        slots.push({
          startTime: toTime(start),
          endTime: toTime(end),
        });
      }

      start += 30; 
    }

    res.json(slots);
  } catch (err) {
    console.error("Slot error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;






// const express = require("express");
// const router = express.Router();

// const Booking = require("../models/Booking");
// const Service = require("../models/Service");
// const StaffAvailability = require("../models/StaffAvailability");
// const Staff = require("../models/Staff");
// const RestaurantHoliday = require("../models/RestaurantHoliday");
// const auth = require("../middlewares/auth");

// /* ================= HELPERS ================= */
// const toMinutes = (t) => {
//   const [h, m] = t.split(":").map(Number);
//   return h * 60 + m;
// };

// const toTime = (m) =>
//   `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(
//     2,
//     "0"
//   )}`;

// const todayDate = () => new Date().toISOString().split("T")[0];
// const currentMinutes = () => {
//   const d = new Date();
//   return d.getHours() * 60 + d.getMinutes();
// };

// /* ===========================================================
//    CREATE BOOKING
// =========================================================== */
// router.post("/", auth, async (req, res) => {
//   try {
//     const { serviceId, staffId, date, startTime, notes } = req.body;

//     const holiday = await RestaurantHoliday.findOne({ date });
//     if (holiday) {
//       return res.status(400).json({
//         message: `Restaurant closed on ${date} (${holiday.reason || "Holiday"})`,
//       });
//     }

//     const staff = await Staff.findById(staffId);
//     if (!staff || staff.isOnLeave || !staff.isAvailable) {
//       return res.status(400).json({ message: "Staff not available" });
//     }

//     const service = await Service.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     const duration = service.durationMinutes;
//     const start = toMinutes(startTime);
//     const end = start + duration;
//     const endTime = toTime(end);

//     const existing = await Booking.find({
//       staffId,
//       date,
//       status: { $in: ["pending", "confirmed"] },
//     });

//     const overlapping = existing.some((b) => {
//       const s = toMinutes(b.startTime);
//       const e = toMinutes(b.endTime);
//       return start < e && s < end;
//     });

//     if (overlapping) {
//       return res.status(409).json({ message: "Slot already booked" });
//     }

//     let finalPrice = service.price;
//     let peakApplied = false;

//     if (
//       service.peakPricing?.enabled &&
//       start >= toMinutes(service.peakPricing.startTime) &&
//       start < toMinutes(service.peakPricing.endTime)
//     ) {
//       finalPrice = Math.round(
//         service.price * service.peakPricing.multiplier
//       );
//       peakApplied = true;
//     }

//     const booking = new Booking({
//       userId: req.user.id,
//       serviceId,
//       staffId,
//       date,
//       startTime,
//       endTime,
//       finalPrice,
//       status: "confirmed",
//       notes,
//     });

//     await booking.save();

//     res.status(201).json({
//       message: "Booking created",
//       booking,
//       peakApplied,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ===========================================================
//    GET AVAILABLE SLOTS
// =========================================================== */
// router.get("/slots", async (req, res) => {
//   try {
//     const { serviceId, staffId, date } = req.query;
//     if (!serviceId || !staffId || !date) return res.json([]);

//     const holiday = await RestaurantHoliday.findOne({ date });
//     if (holiday) return res.json([]);

//     const service = await Service.findById(serviceId);
//     const staff = await Staff.findById(staffId);
//     if (!service || !staff || staff.isOnLeave || !staff.isAvailable)
//       return res.json([]);

//     const duration = service.durationMinutes;

//     const [y, m, d] = date.split("-").map(Number);
//     const dayName = new Date(y, m - 1, d).toLocaleDateString("en-US", {
//       weekday: "long",
//     });

//     const availability = await StaffAvailability.findOne({
//       staffId,
//       day: dayName,
//     });

//     if (!availability) return res.json([]);

//     const startDay = toMinutes(availability.startTime);
//     const endDay = toMinutes(availability.endTime);

//     const booked = await Booking.find({
//       staffId,
//       date,
//       status: { $in: ["pending", "confirmed"] },
//     });

//     const bookedRanges = booked.map((b) => ({
//       s: toMinutes(b.startTime),
//       e: toMinutes(b.endTime),
//     }));

//     let start = startDay;
//     const slots = [];

//     while (start + duration <= endDay) {
//       const end = start + duration;
//       const overlap = bookedRanges.some((b) => start < b.e && b.s < end);

//       if (!overlap) {
//         slots.push({
//           startTime: toTime(start),
//           endTime: toTime(end),
//         });
//       }

//       start += 30;
//     }

//     res.json(slots);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ===========================================================
//    AUTO-COMPLETE BOOKINGS (CONFIRMED → COMPLETED)
// =========================================================== */
// async function autoCompleteBookings() {
//   const bookings = await Booking.find({ status: "confirmed" });

//   for (const b of bookings) {
//     const bookingEnd = toMinutes(b.endTime);

//     if (
//       b.date < todayDate() ||
//       (b.date === todayDate() && bookingEnd < currentMinutes())
//     ) {
//       b.status = "completed";
//       await b.save();
//     }
//   }
// }

// /* ===========================================================
//    MY BOOKINGS (USER)
// =========================================================== */
// router.get("/my", auth, async (req, res) => {
//   await autoCompleteBookings();

//   const bookings = await Booking.find({ userId: req.user.id })
//     .populate("serviceId")
//     .populate("staffId");

//   res.json(bookings);
// });

// /* ===========================================================
//    ADMIN – MARK COMPLETED
// =========================================================== */
// router.put("/:id/complete", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Admin only" });
//     }

//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "completed";
//     await booking.save();

//     res.json({ message: "Booking marked as completed" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;