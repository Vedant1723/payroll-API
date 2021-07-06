const mongoose = require("mongoose");

const AllowanceSchema = new mongoose.Schema({
  empId: { type: String },
  businessId: { type: String },
  salarysId: { type: String },
  date: { type: Date, default: Date.now() },
  amount: { type: Number },
  details: { type: String },
  status: { type: String },
});

module.exports = Allowance = mongoose.model("Allowance", AllowanceSchema);
