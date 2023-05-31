
const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    name: {
        type: String,
        required: [true,"Must Provide Title"],
        maxlength: [50, "Character must not exceeds 50"]
    },
    content: {
        type: String,
        required: [true, "Must Provide Description"]
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: String,
        maxlength: [100, "Comment must contain character less than 100"]
    }

})

const taskModel = mongoose.model("Tasks", taskSchema)

module.exports = taskModel