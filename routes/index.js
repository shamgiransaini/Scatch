const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")
const adminModel = require("../models/admin-model")

router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("index", { error, loggedin: false })
})

router.get("/admin", isLoggedIn, async (req, res) => {

    let admin = await adminModel.findOne({ email: req.auth.email }).populate("products")


    if (req.auth.isadmin === false) {
        req.flash("error", "You are not a admin")
        return res.redirect("/shop")
    }
    let success = req.flash("success")
    let error = req.flash("error")
    let isadmin = req.auth.isadmin
    res.render("admin", { success, error, isadmin: isadmin, admin })
})
router.get("/product-create", isLoggedIn, function (req, res) {
    if (req.auth.isadmin === false) {
        req.flash("error", "You are not a admin")
        return res.redirect(back())
    }
    let error = req.flash("error")
    let success = req.flash("success")
    let isadmin = req.auth.isadmin
    res.render("createproducts", { success, isadmin: isadmin, error })
})
router.get("/product/edit/:id", isLoggedIn, async (req, res) => {
    if (req.auth.isadmin === false) {
        req.flash("error", "You are not a admin")
        return res.redirect(back())
    }

    let product = await productModel.findOne({ _id: req.params.id })


    let error = req.flash("error")
    let success = req.flash("success")
    let isadmin = req.auth.isadmin
    res.render("editproducts", { success, isadmin: isadmin, error, product })
})

router.get("/shop", isLoggedIn, async (req, res) => {
    let isadmin = req.auth.isadmin
    let products = await productModel.find();
    let success = req.flash("success")
    let error = req.flash("error")
    // res.send(products)
    res.render("shop", { products, success, error, isadmin: isadmin })
})
router.get("/cart", isLoggedIn, async (req, res) => {
    let isadmin = req.auth.isadmin
    if (isadmin === true) {
        let auth = await adminModel.findOne({ email: req.auth.email }).populate("cart")
        //    let success = req.flash("success")
        return res.render("cart", { auth, isadmin: isadmin })
    } else {
        let auth = await userModel.findOne({ email: req.auth.email }).populate("cart")
        //    let success = req.flash("success")
        return res.render("cart", { auth, isadmin: isadmin })
    }
})

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    let isadmin = req.auth.isadmin
    if (isadmin === true) {
        let auth = await adminModel.findOne({ email: req.auth.email })
        if (auth.cart.indexOf(req.params.productid) === -1) {
            auth.cart.push(req.params.productid)
            await auth.save()
            req.flash("success", "Added to cart")
            return res.redirect("/shop")
        } else {
            req.flash("error", "Alrady AddToCart This Product")
            return res.redirect('/shop')
        }
    } else {
        let auth = await userModel.findOne({ email: req.auth.email })
        if (auth.cart.indexOf(req.params.productid) === -1) {
            auth.cart.push(req.params.productid)
            await auth.save()
            req.flash("success", "Added to cart")
            res.redirect("/shop")
        } else {
            req.flash("error", "Alrady AddToCart This Product")
            return res.redirect('/shop')
        }
    }

})

router.get("/logout", isLoggedIn || isAdminLoggedIn, (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})

module.exports = router