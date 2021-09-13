let express = require('express')  // unsure of this in final code?
const router = express.Router()
const { User } = require("../models")
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Registration included fname to personalize greeting
router.post("/register", async (req, res) => {
    let { fname, email, password } = req.body.user;
    try {
    const Person = await User.create({
        fname, 
        email, 
        password: bcrypt.hashSync(password, 12),
    });

    let token = jwt.sign({id: Person.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    
    res.status(201).json({
        message: "User successfully registered!",
        user: Person,
        sessionToken: token
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

        let passwordComparison = await bcrypt.compare(password, loginPerson.password);

        if (passwordComparison) {

        let token = jwt.sign({id: loginPerson}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    res.status(200).json({
        user: loginPerson,
        message: "User successfully logged in!",
        sessionToken: token
    })
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        })
    }

    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
})

module.exports = router;