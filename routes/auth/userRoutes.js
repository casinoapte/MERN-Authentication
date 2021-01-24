const router = require('express').Router();
const User = require("../../models/user");
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs');

/////////////////////
// Register Route //
/////////////////////

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, username } = req.body

        // Validate //

        if (!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered" });

        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "Password needs to be at least 5 characters" });

        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Passwords need to match" });

        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "Account with this email already exists" });

        if (!username) username = email

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password: passwordHash,
            username,
        })

        const savedUser = await newUser.save()
        res.json(savedUser)

    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.message });
    }
})

//////////////////
// Login Route //
//////////////////

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate //

        if (!email || !password)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered" });

        const user = await User.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No Account With This Email" });

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res
                .status(400)
                .json({ msg: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//////////////////
// Delete Route //
//////////////////

router.delete("/delete", auth, async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

})

//////////////////
// Valid Token //
//////////////////

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.json(false)

        const user = await User.findById(verified.id)
        if (!user)
        return res.json(false)

        return res.json(true)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//////////////////
// Get User Info //
//////////////////

router.get("/", auth, async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user)
    res.json({
        username: user.username,
        id: user._id
    })
})

module.exports = router;