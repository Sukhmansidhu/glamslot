const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "Toni & Guy Inspired",
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    image: String,
    category: {
      type: String,
      enum: ["Shampoo", "Conditioner", "Styling", "Tools"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);