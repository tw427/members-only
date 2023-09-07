const Message = require("../models/message");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "Create Message",
  });
});

exports.message_create_post = [
  body("title").trim().isLength({ min: 1, max: 60 }).escape(),
  body("message").trim().isLength({ min: 1, max: 255 }).escape(),

  asyncHandler(async (req, res, next) => {
    const author = await User.findById(req.params.id).exec();
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      author: author.username,
      authorid: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create Message",
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
