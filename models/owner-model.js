const mongoose = require("mongoose")

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLenght: 3,
        trim: true
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
    gstin: String
})

module.exports = mongoose("owner", ownerSchema)