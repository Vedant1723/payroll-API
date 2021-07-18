const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "15m" },
  },
});

module.exports = Otp = mongoose.model("Otp", OtpSchema);
