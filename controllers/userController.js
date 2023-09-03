const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numUsers, numMessages] = await Promise.all([
    User.countDocuments({}).exec(),
    Message.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Members Only",
    user_count: numUsers,
    message_count: numMessages,
  });
});

exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "username membership").exec();

  res.render("user_list", {
    title: "User List",
    users: allUsers,
  });
});

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("user_form", { title: "Create Account" });
});

exports.user_create_post = [
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("user_form", {
        title: "Create Account",
        errors: errors.array(),
      });
    } else {
      try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return err;
          }
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            // membership: "New",
          });
          await user.save();
        });
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  }),
];
