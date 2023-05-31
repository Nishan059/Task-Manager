const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"Must Provide name"],
        maxlength: [20, "Characters must not be exceed 20"]
    },
    lastName: {
        type: String,
        required: [true,"Must Provide name"],
        maxlength: [20, "Characters must not be exceed 20"]
    },
    userName: {
        type: String,
        required: [true,"Must Provide Username"],
        maxlength: [20, "Characters must not be exceed 20"],
        unique:true
    },
    password: {
        type: String,
        required: [true,"Must Provide a Password"],
    }
})


const userModel = mongoose.model("Users", userSchema);

// Export
module.exports = userModel