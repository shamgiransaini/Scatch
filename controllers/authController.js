const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const adminModel = require("../models/admin-model")


module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body

        if (!email || !password || !fullname) {
            let missingFields = [];
            if (!fullname) missingFields.push('fullname');
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');

            req.flash('error', `Please fill ${missingFields.join(', ')}.`);
            return res.redirect('/');
        }
        let user = await userModel.findOne({ email: email })

        if (user) {
            req.flash("error", "You already have an account, please login.")
            return res.redirect("/")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    req.flash("success", "User created Successfully")

                    res.redirect("/shop")
                }

            })
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email: email })
    if (user) {
        if (!user) {
            req.flash("error", "Email or Password incorrect")
            return res.redirect("/")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            // res.send(result)
            if (result) {
                let token = generateToken(user)
                res.cookie("token", token)
                req.flash("success", "User Logged in")
                res.redirect("/shop")
            } else {
                req.flash("error", "Email and Password incorrect 02")
                return res.redirect("/")
            }
        })
    } else {
        let admin = await adminModel.findOne({ email: email })
        if (!admin) {
            req.flash("error", "Email or Password incorrect")
            return res.redirect("/")
        }
        bcrypt.compare(password, admin.password, (err, result) => {
            // res.send(result)
            if (result) {
                let token = generateToken(admin)
                res.cookie("token", token)
                req.flash("success", "Admin Logged in")
                res.redirect("/admin")
            } else {
                req.flash("error", "Email and Password incorrect 02")
                return res.redirect("/")
            }
        })
    }

}