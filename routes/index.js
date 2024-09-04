const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")

router.get("/", (req, res) => {
    let error = req.flash("error")
    console.log(error.length);

    res.render("index", { error, loggedin: false })
})

router.get("/shop", isLoggedIn, async (erq, res) => {
    let products = await productModel.find();
    res.render("shop", { products })
})

router.get("/addtocart/:id", isLoggedIn, async (erq, res) => {

})

router.get("/logout", isLoggedIn, (erq, res) => {
    res.cookie("token", "")
    res.redirect("/")
})

module.exports = router