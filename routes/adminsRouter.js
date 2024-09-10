const express = require("express")
const router = express.Router()
const adminModel = require("../models/admin-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")


console.log(process.env.NODE_ENV + " admin env");


if (process.env.NODE_ENV === "development") {
    router.post("/register", async (req, res) => {
        let { fullname, email, password } = req.body;
        if (!email || !password || !fullname) {
            let missingFields = [];
            if (!fullname) missingFields.push('fullname');
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');

            req.flash('error', `Please fill ${missingFields.join(', ')}.`);
            return res.redirect('/');
        }
        let admin = await adminModel.findOne({ email: email })

        if (admin) {
            req.flash("error", "You already have an account, please login.")
            return res.redirect("/")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let admin = await adminModel.create({
                        email,
                        password: hash,
                        fullname
                    })
                    let token = generateToken(admin)
                    res.cookie("token", token)
                    req.flash("success", "Admin created Successfully")
                    res.redirect("/admin")
                }

            })
        })

    })
}





module.exports = router