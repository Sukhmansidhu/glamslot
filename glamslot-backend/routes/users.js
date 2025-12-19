const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth"); 

router.get("/wallet", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("walletBalance");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      balance: user.walletBalance,
    });
  } catch (err) {
    console.error("Wallet fetch error:", err.message);
    res.status(500).json({ message: "Failed to load wallet" });
  }
});

module.exports = router;