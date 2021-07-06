const mongoose = require("mongoose");

const AllowanceSchema = new mongoose.Schema({
  empID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  salarysID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: { type: Date, default: Date.now() },
  amount: { type: Number },
  details: { type: String },
});

module.exports = Allowance = mongoose.model("Allowance", AllowanceSchema);
