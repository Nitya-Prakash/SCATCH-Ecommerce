const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    contact: Number,
    products: {
        type: Array,
        default: []
    },
    picture: {
        type: String,
    },
    gstin: String
})

module.exports = mongoose.model("owner", ownerSchema);