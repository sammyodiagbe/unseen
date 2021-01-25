const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
});

userSchema.methods.hashPassword = (password) => bcrypt.hashSync(password, 12);
module.exports = mongoose.model("User", userSchema);
