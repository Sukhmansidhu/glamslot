const mongoose = require("mongoose");

const PeakHourPricingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    startTime: {
      type: String, // "18:00"
      required: true,
    },

    endTime: {
      type: String, // "21:00"
      required: true,
    },

    extraCharge: {
      type: Number, // 50
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PeakHourPricing", PeakHourPricingSchema);