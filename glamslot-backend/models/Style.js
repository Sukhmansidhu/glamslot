const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Haircut", "Color", "Beard", "Bridal", "Styling"],
      required: true,
    },
    image: { type: String, required: true }, 
    description: String,
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Style", styleSchema);