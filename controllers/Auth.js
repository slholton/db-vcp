let express = require('express')
let router = express.Router()
const { Users } = require("../models")

const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Registration included fname to personalize greeting
router.post("/register", async (req, res) => {
    let { fname, email, password } = req.body.user;
    let message

    try {
        const user = await Users.create({
            fname,
            email,
            password: bcrypt.hashSync(password, 12),
        });

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        message = {
            msg: 'User Created',
            // user,
            sessionToken: token

        }

        // res.status(201).json({
        //     message: "User successfully registered!",
        //     user: User,
        //     sessionToken: token
        // });

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            message = {
                msg: 'Failed to Create User'
            }
        //     res.status(409).json({
        //         message: "Email already in use",
        //     });
        // } else {
        //     res.status(500).json({
        //         message: "Failed to register user",
        //     })
        }
    }
    res.json(message)
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginUser = await Users.findOne({
            where: {
                email: email,
            }
        })

        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {

            let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.status(200).json({
                user: loginUser,
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