const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owner-model")

console.log(process.env.NODE_ENV + " owner env");


if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owner = await ownerModel.find()
        if (owner.length > 0) return res.send(503).send("You don't have permission ot create a new owner.")
        let { fullname, email, password } = req.body;
        let createdOwener = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwener)
    })
}

router.get("/admin", function (req, res) {
    let success = req.flash("success")
    res.render("createproducts", {success})
})



module.exports = router