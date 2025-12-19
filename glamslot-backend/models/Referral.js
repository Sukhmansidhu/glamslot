const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    referee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    friendEmail: {
      type: String,
    },

    isJoined: {
      type: Boolean,
      default: false,
    },

    rewardGiven: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);