// Imports
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Database/connect");
const userRoutes = require("./Router/users");
const taskRoutes = require("./Router/tasks");

const cookieParser = require("cookie-parser");
const cors = require("cors");

// Implementation
const app = express();
dotenv.config();

// Middleware
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(express.static('Client'))
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1",taskRoutes)
app.use("/api/v1",userRoutes)


// Server
const port = process.env.SERVER_PORT;
const database_port= process.env.DATABASE_URI;

const start = async() => {
    try {
        await connectDB(database_port)
        app.listen(port, () => console.log(`Port is Running on Server: ${port}...`));
    } catch (error) {
        console.log(error)
    }
}

start();