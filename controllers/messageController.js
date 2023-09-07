const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "Create Message",
  });
});

exports.message_create_post = asyncHandler(async (req, res, next) => {});
