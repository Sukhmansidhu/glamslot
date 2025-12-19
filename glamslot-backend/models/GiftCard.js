const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isRedeemed: {
      type: Boolean,
      default: false,
    },
    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    redeemedAt: Date,
    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiftCard", giftCardSchema);