const mongoose = require("mongoose");

const RestaurantHolidaySchema = new mongoose.Schema(
  {
    date: {
      type: String, 
      required: true,
      unique: true,
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RestaurantHoliday",
  RestaurantHolidaySchema
);