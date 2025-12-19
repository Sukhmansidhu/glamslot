const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    finalPrice: {
      type: Number,
      required: true,
    },

    walletUsed: {
      type: Number,
      default: 0,
    },

    giftCode: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "confirmed",
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);