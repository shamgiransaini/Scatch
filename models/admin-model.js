const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLenght: 3,
        trim: true
    },
    email: String,
    password: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    isadmin: {
        type: Boolean,
        default: true
    },
    contact: Number,
    picture: String,
    gstin: String,
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("admin", adminSchema)