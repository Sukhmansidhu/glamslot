const mongoose = require("mongoose");

const StaffAvailabilitySchema = new mongoose.Schema({
  staffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Staff", 
    required: true 
  },

  day: { 
    type: String, 
    required: true,
    enum: [
      "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday", "Sunday"
    ]
  },

  startTime: { type: String, required: true },
  endTime: { type: String, required: true }   
});

module.exports = mongoose.model(
  "StaffAvailability",
  StaffAvailabilitySchema
);