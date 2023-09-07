const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  authorid: { type: String, required: true },
  time: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Message", MessageSchema);
