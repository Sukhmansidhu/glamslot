const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.post("/create", auth, async (req, res) => {
  const code = crypto.randomBytes(4).toString("hex").toUpperCase();

  const referral = new Referral({
    referrer: req.user.id,
    code,
  });

  await referral.save();
  res.json({ code });
});

router.post("/apply", auth, async (req, res) => {
  const { code } = req.body;

  const referral = await Referral.findOne({ code });

  if (!referral) {
    return res.status(400).json({ message: "Invalid referral code" });
  }

  // ❌ Cannot use own code
  if (referral.referrer.toString() === req.user.id) {
    return res.status(400).json({ message: "You cannot refer yourself" });
  }

  if (referral.rewardGiven) {
    return res.status(400).json({ message: "Referral already used" });
  }

  const alreadyUsed = await Referral.findOne({
    referee: req.user.id,
    rewardGiven: true,
  });

  if (alreadyUsed) {
    return res.status(400).json({
      message: "You have already used a referral code",
    });
  }

  const referrerUser = await User.findById(referral.referrer);
  const refereeUser = await User.findById(req.user.id);

  if (!referrerUser || !refereeUser) {
    return res.status(404).json({ message: "User not found" });
  }

  referrerUser.walletBalance += 100;
  refereeUser.walletBalance += 50;  

  await referrerUser.save();
  await refereeUser.save();

  referral.rewardGiven = true;
  referral.isJoined = true;
  referral.referee = req.user.id;
  referral.friendEmail = refereeUser.email;

  await referral.save();

  res.json({
    message: "Referral applied successfully 🎉",
    rewards: {
      referrer: 100,
      referee: 50,
    },
  });
});

router.get("/my", auth, async (req, res) => {
  const referrals = await Referral.find({
    referrer: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(referrals);
});

router.post("/send", auth, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const referral = new Referral({
      referrer: req.user.id,
      friendEmail: email,
    });

    await referral.save();

    await sendEmail(
      email,
      "🎉 You’re Invited to GlamSlot!",
      `
        <h2>Your friend invited you to GlamSlot 💇‍♀️</h2>
        <p>Sign up & enjoy premium salon services.</p>
        <p><b>🎁 You’ll get ₹50 after applying referral!</b></p>
      `
    );

    res.json({ message: "Referral sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send referral" });
  }
});

router.get("/admin/analytics", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const totalReferrals = await Referral.countDocuments();
  const usedReferrals = await Referral.countDocuments({ rewardGiven: true });
  const totalRewards = usedReferrals * 150;

  const list = await Referral.find()
    .populate("referrer", "name email")
    .sort({ createdAt: -1 });

  res.json({
    summary: {
      totalReferrals,
      usedReferrals,
      totalRewards,
    },
    referrals: list,
  });
});

module.exports = router;