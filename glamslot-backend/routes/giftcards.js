const express = require("express");
const router = express.Router();
const GiftCard = require("../models/GiftCard");
const auth = require("../middlewares/auth");
const crypto = require("crypto");
const sendGiftCardEmail = require("../utils/sendEmail");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const { amount, expiryDate } = req.body;

    const code =
      "GC-" + crypto.randomBytes(4).toString("hex").toUpperCase();

    const giftCard = new GiftCard({
      code,
      amount,
      expiryDate,
    });

    await giftCard.save();
    res.status(201).json(giftCard);
  } catch (err) {
    res.status(500).json({ message: "Failed to create gift card" });
  }
});

router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const cards = await GiftCard.find().sort({ createdAt: -1 });
  res.json(cards);
});

router.post("/redeem", auth, async (req, res) => {
  const { code } = req.body;

  const card = await GiftCard.findOne({ code });

  if (!card) {
    return res.status(404).json({ message: "Invalid gift card" });
  }

  if (card.isRedeemed) {
    return res.status(400).json({ message: "Gift card already used" });
  }

  if (card.expiryDate && card.expiryDate < new Date()) {
    return res.status(400).json({ message: "Gift card expired" });
  }

  card.isRedeemed = true;
  card.redeemedBy = req.user.id;
  await card.save();

  res.json({
    message: "Gift card redeemed 🎉",
    amount: card.amount,
  });
});

router.post("/send", async (req, res) => {
  const { email, amount } = req.body;

  try {
    const code =
      "GC-" + crypto.randomBytes(4).toString("hex").toUpperCase();

    const giftCard = new GiftCard({
      code,
      amount,
    });

    await giftCard.save();

    await sendGiftCardEmail(email, code, amount);

    res.json({
      message: "Gift card sent successfully 🎉",
      code,
      amount,
    });
  } catch (err) {
    console.error("Gift card email failed:", err.message);
    res.status(500).json({ message: "Email failed" });
  }
});

module.exports = router;