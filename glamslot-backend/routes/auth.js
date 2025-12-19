const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user" 
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (role && user.role !== role) {
            return res.status(400).json({ message: "Incorrect role selected" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;