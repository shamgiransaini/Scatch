const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    },
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("product", productSchema)