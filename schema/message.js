const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  target_user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("message", messageSchema);
