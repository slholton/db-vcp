let express = require('express')  // unsure of this in final code?
const router = express.Router()
const { User } = require("../models")
const { UniqueConstraintError } = require("sequelize/lib/errors")

// Registration included fname to personalize greeting
router.post("/register", async (req, res) => {
    let { fname, email, password } = req.body.user;
    try {
    const Person = await User.create({
        fname, 
        email, 
        password
    });
    
    res.status(201).json({
        message: "User successfully registered!",
        user: Person,
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
            message: "Failed to register user",
        })
    }
}
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginPerson = await User.findOne({
        where: {
            email: email,
        }
    })

    if (loginPerson) {
    res.status(200).json({
        user: loginPerson,
        message: "User successfully logged in!"
    })
    } else {
        res.status(401).json({
            message: "Login failed"
        })
    }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
})

module.exports = router;