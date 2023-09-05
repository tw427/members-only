const express = require("express");
const router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");

// Create account
router.get("/create", user_controller.user_create_get);
router.post("/create", user_controller.user_create_post);
// Login
router.get("/log-in", user_controller.user_login_get);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/log-in",
  })
);
// Secret | Join Club
router.get("/secret/:id", user_controller.user_secret_get);
router.post("/secret/:id", user_controller.user_secret_post);

module.exports = router;
