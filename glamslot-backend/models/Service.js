const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    peakPricing: {
      enabled: {
        type: Boolean,
        default: false,
      },
      startTime: {
        type: String, 
      },
      endTime: {
        type: String,
      },
      multiplier: {
        type: Number,
        default: 1,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);