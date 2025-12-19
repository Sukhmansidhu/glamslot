const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const auth = require("../middlewares/auth");


router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can create services" });
    }

    const { title, durationMinutes, description, price } = req.body;

    if (!title || !durationMinutes || !price) {
      return res
        .status(400)
        .json({ message: "Title, duration and price are required" });
    }

    const service = new Service({
      title,
      durationMinutes,
      description,
      price,
    });

    await service.save();

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can update services" });
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service updated successfully",
      service: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can delete services" });
    }

    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;