const express = require("express");
const router = express.Router();

const {
    get_user,
    create_user,
    authenticate_user,
    logout_user
} = require("../Controllers/users");

// Routes
router.route("/user").get(get_user)
router.route("/create-user").post(create_user)
router.route("/authenticate-user").post(authenticate_user)
router.route("/logout-user").post(logout_user)


// Export
module.exports = router