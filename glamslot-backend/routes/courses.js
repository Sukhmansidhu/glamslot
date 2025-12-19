const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});

router.get("/", async (req, res) => {
  const courses = await Course.find({ isActive: true });
  res.json(courses);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

module.exports = router;