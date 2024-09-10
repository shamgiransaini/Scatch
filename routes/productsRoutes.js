const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")
const isLoggedIn = require("../middlewares/isLoggedIn")
const adminModel = require("../models/admin-model")

router.post("/create", upload.single("image"), isLoggedIn, async function (req, res) {
    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor } = req.body

        let admin = await adminModel.findOne({ email: req.auth.email })

        let product = await productModel.create({
            admin: admin._id,
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        admin.products.push(product._id)
        admin.save()
        req.flash("success", "Product created successfully.")
        res.redirect("/admin")
    } catch (err) {
        res.send(err.message)
    }

})
router.post("/create", upload.single("image"), isLoggedIn, async function (req, res) {
    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor } = req.body

        let admin = await adminModel.findOne({ email: req.auth.email })

        let product = await productModel.create({
            admin: admin._id,
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        admin.products.push(product._id)
        admin.save()
        req.flash("success", "Product created successfully.")
        res.redirect("/admin")
    } catch (err) {
        res.send(err.message)
    }

})


module.exports = router