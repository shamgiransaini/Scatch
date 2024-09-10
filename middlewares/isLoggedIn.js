const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
const adminModel = require("../models/admin-model")

module.exports = async (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === "") {
        req.flash("error", "You need to login first")
        return res.redirect("/")

    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let isAdmin = await adminModel.findOne({ email: decoded.email });

        if (isAdmin) {
            req.auth = isAdmin;
        } else {
            let user = await userModel.findOne({ email: decoded.email })
                .select("-password");
            req.auth = user;
        }
        next()
    } catch (err) {
        req.flash("error", "something went worng from Logged in function.")
        res.redirect("/")
    }
}