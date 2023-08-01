const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    transactions:{
        type: Array,
    }
})

module.exports = mongoose.model('User', userSchema)