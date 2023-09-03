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
// router.post("/log-in", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.render("user_login", { error: "Wrong username or password!" });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/");
//     })(req, res, next);
//   });
// });

module.exports = router;
