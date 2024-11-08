const express=require('express');
const jwt = require('jsonwebtoken');
const middleware=require('../utils/middleware');
const User =require('../models/UserSchema')
const router = express.Router();

// ---------------------------------

router.post('/signup', async (req, res) => {
    try {
        const { userName,email, password } = req.body
        const newuser = new User({
            userName,email, password
        })
        await newuser.save();
        const token = jwt.sign({ id: newuser._id }, process.env.URI);
        res.status(201).json({ user: newuser, message: "Created Successfuly", token });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})




// --------------------------
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isValid = await user.isValidPassword(password)
        if (isValid && user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET);
            res.json({ user: user, message: "Connected Seccessfuly", token });
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// ----------------------------------------
router.get('/', middleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// -------------------------------------------------
router.get('/:userId', middleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// -------------------------------
router.put('/:userId', middleware, async (req, res) => {
    try {
        const { userName,email, password } = req.body
        const user = await User.findByIdAndUpdate(req.params.userId, { userName,email, password })
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "cant recognize the user!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// -------------------------
router.delete('/:userId', middleware, async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.userId)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;