const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },

    restaurantOpenTime: {
      type: String, 
      default: "09:00",
    },

    restaurantCloseTime: {
      type: String, 
      default: "21:00",
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    photo: {
      type: String, 
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    fees: {
      type: Number,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isOnLeave: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);