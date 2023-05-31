const express = require("express");
const router = express.Router();

const {
    get_tasks,
    create_task,
    update_task,
    delete_task
} = require("../Controllers/tasks");
// Routes
router.route("/tasks").get(get_tasks)
router.route("/create-task").post(create_task)
router.route("/update-task").post()
router.route("/delete-task").post()


// Export
module.exports = router