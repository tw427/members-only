const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// Create account
router.get("/create", user_controller.user_create_get);
router.post("/create", user_controller.user_create_post);

module.exports = router;
