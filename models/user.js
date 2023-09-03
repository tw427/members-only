const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: {
    type: String,
    default: "New",
    enum: ["New", "Member", "Admin"],
  },
});

module.exports = mongoose.model("User", UserSchema);
