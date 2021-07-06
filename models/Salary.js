const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  empId: { type: String },
  businessId: { type: String },
  salarysId: { type: String },
  date: { type: Date, default: Date.now() },
  amount: { type: Number },
  type: { type: String },
  status: { type: String },
});

module.exports = Salary = mongoose.model("Salary", SalarySchema);
