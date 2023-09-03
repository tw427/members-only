const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", user_controller.index);

module.exports = router;
