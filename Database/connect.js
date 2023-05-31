const mongoose = require("mongoose");

const connectDB = (database_url) => {
    return mongoose
    .connect(database_url)
}

// Exports
module.exports = connectDB